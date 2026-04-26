import { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { fetchUserProfile } from '../services/userProfileService';

interface UseUserProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export function useUserProfile(): UseUserProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchUserProfile()
      .then(data => {
        if (!cancelled) {
          setProfile(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load user profile.');
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { profile, isLoading, error };
}
