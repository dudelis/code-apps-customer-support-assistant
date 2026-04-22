import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';
import { fetchCalendarEvents } from '../services/calendarService';

interface UseCalendarEventsResult {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
}

export function useCalendarEvents(): UseCalendarEventsResult {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCalendarEvents()
      .then(data => {
        if (!cancelled) {
          setEvents(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load calendar events.');
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { events, isLoading, error };
}
