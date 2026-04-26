/**
 * userProfileService — fetches the signed-in user's M365 profile.
 *
 * Current limitations:
 *   - Real connector integration is not yet wired up. Set VITE_M365_MODE=live
 *     in .env.local to switch from mock data to live calls once the Office 365
 *     Users connector is registered in the Power Apps data sources.
 *   - The photo endpoint returns binary data; in live mode the service fetches
 *     it and converts to a base64 data URL before returning.
 *
 * Where the real connector plugs in:
 *   Replace the mock return inside fetchUserProfile with calls to the connector
 *   generated service (e.g. Office365UsersService.MyProfile() and
 *   Office365UsersService.MyProfilePhoto()).
 */

import type { UserProfile } from '../types';
import { mockUserProfile } from '../data/userProfile';
import { Office365UsersService } from '../generated/services/Office365UsersService';

const IS_LIVE = import.meta.env.VITE_M365_MODE === 'live';

export async function fetchUserProfile(): Promise<UserProfile> {
  if (!IS_LIVE) {
    return mockUserProfile;
  }

  const profileResult = await Office365UsersService.MyProfile();
  if (!profileResult.success || !profileResult.data) {
    throw new Error('Failed to load user profile from Office 365.');
  }

  const profile = profileResult.data;

  let photoUrl: string | null = null;
  try {
    const photoResult = await Office365UsersService.UserPhoto(profile.Id);
    if (photoResult.success && photoResult.data) {
      const raw = photoResult.data;
      // The connector returns raw base64 — prefix it to make a valid data URL
      photoUrl = raw.startsWith('data:') ? raw : `data:image/jpeg;base64,${raw}`;
    }
  } catch {
    // No photo set — keep null and show initials fallback
  }

  return {
    id: profile.Id,
    displayName: profile.DisplayName ?? profile.Id,
    jobTitle: profile.JobTitle ?? '',
    photoUrl,
    email: profile.Mail ?? profile.UserPrincipalName ?? '',
  };
}
