/**
 * calendarService — fetches the signed-in user's upcoming M365 calendar events.
 *
 * Current limitations:
 *   - Real connector integration is not yet wired up. Set VITE_M365_MODE=live
 *     in .env.local to switch from mock data to live calls once the Office 365
 *     Outlook connector is registered in the Power Apps data sources.
 *   - Live mode queries events for the next 7 days; date range can be adjusted
 *     via the CALENDAR_DAYS_AHEAD constant below.
 *
 * Where the real connector plugs in:
 *   Replace the mock return inside fetchCalendarEvents with calls to the
 *   connector generated service (e.g. Office365OutlookService.GetEventsV3()).
 */

import type { CalendarEvent } from '../types';
import { mockCalendarEvents } from '../data/calendarEvents';
import { Office365OutlookService } from '../generated/services/Office365OutlookService';
import type { CalendarEventClientReceiveStringEnums } from '../generated/models/Office365OutlookModel';

const IS_LIVE = import.meta.env.VITE_M365_MODE === 'live';
const CALENDAR_DAYS_AHEAD = 30;
const DEFAULT_CALENDAR = 'Calendar';

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  if (!IS_LIVE) {
    return mockCalendarEvents;
  }

  const now = new Date();
  const end = new Date(now.getTime() + CALENDAR_DAYS_AHEAD * 24 * 60 * 60 * 1000);

  const result = await Office365OutlookService.GetEventsCalendarViewV2(
    DEFAULT_CALENDAR,
    now.toISOString(),
    end.toISOString(),
    undefined,
    'start/dateTime',
    50,
  );

  if (!result.success || !result.data) {
    throw new Error('Failed to load calendar events from Office 365.');
  }

  return (result.data.value ?? []).map(mapRawEvent);
}

function mapRawEvent(raw: CalendarEventClientReceiveStringEnums): CalendarEvent {
  const timeZone = raw.TimeZone ?? 'UTC';
  const attendees = parseAttendees(raw.RequiredAttendees, raw.OptionalAttendees);

  return {
    id: raw.Id ?? crypto.randomUUID(),
    subject: raw.Subject ?? '(No subject)',
    start: { dateTime: raw.Start ?? '', timeZone },
    end: { dateTime: raw.End ?? '', timeZone },
    isAllDay: raw.IsAllDay ?? false,
    organizer: raw.Organizer ?? '',
    attendees,
    isOnlineMeeting: false,
  };
}

function parseAttendees(required?: string, optional?: string): string[] {
  const all = [required, optional]
    .filter((s): s is string => !!s && s.trim().length > 0)
    .flatMap(s => s.split(';').map(a => a.trim()))
    .filter(a => a.length > 0);
  return all;
}
