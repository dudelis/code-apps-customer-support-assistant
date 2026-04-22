import { makeStyles, tokens, Text, Spinner, MessageBar } from '@fluentui/react-components';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import { GlassPanel } from '../shared/GlassPanel';
import type { CalendarEvent } from '../../types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  heading: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '4px',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 0',
  },
  empty: {
    textAlign: 'center',
    padding: '48px 0',
    color: tokens.colorNeutralForeground3,
  },
  eventCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px 20px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    transition: 'background 0.15s ease',
    ':hover': {
      background: 'rgba(255,255,255,0.06)',
    },
  },
  eventHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  subject: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  badge: {
    display: 'flex',
    gap: '6px',
  },
  onlineBadge: {
    fontSize: '11px',
    color: '#4ade80',
    background: 'rgba(74,222,128,0.12)',
    border: '1px solid rgba(74,222,128,0.25)',
    borderRadius: '6px',
    padding: '2px 8px',
    whiteSpace: 'nowrap',
  },
  allDayBadge: {
    fontSize: '11px',
    color: '#facc15',
    background: 'rgba(250,204,21,0.12)',
    border: '1px solid rgba(250,204,21,0.25)',
    borderRadius: '6px',
    padding: '2px 8px',
    whiteSpace: 'nowrap',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: tokens.colorNeutralForeground3,
  },
  metaIcon: {
    fontSize: '12px',
  },
  attendeeList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
  },
  attendeeChip: {
    fontSize: '11px',
    color: tokens.colorNeutralForeground2,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '20px',
    padding: '2px 10px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
});

function formatTime(dateTime: string, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateTime));
  } catch {
    return dateTime.slice(11, 16);
  }
}

function formatDate(dateTime: string, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateTime));
  } catch {
    return dateTime.slice(0, 10);
  }
}

interface EventCardProps {
  event: CalendarEvent;
}

function EventCard({ event }: EventCardProps) {
  const styles = useStyles();
  const { start, end, isAllDay } = event;

  const dateLabel = formatDate(start.dateTime, start.timeZone);
  const timeLabel = isAllDay
    ? 'All day'
    : `${formatTime(start.dateTime, start.timeZone)} – ${formatTime(end.dateTime, end.timeZone)}`;

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventHeader}>
        <Text size={300} className={styles.subject}>{event.subject}</Text>
        <div className={styles.badge}>
          {event.isAllDay && <span className={styles.allDayBadge}>All day</span>}
          {event.isOnlineMeeting && <span className={styles.onlineBadge}>🎥 Online</span>}
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>📅</span>
          <Text size={200}>{dateLabel}</Text>
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>🕐</span>
          <Text size={200}>{timeLabel}</Text>
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>👤</span>
          <Text size={200}>{event.organizer}</Text>
        </span>
      </div>

      {event.attendees.length > 0 && (
        <div className={styles.attendeeList}>
          {event.attendees.map(name => (
            <span key={name} className={styles.attendeeChip}>{name}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function CalendarView() {
  const styles = useStyles();
  const { events, isLoading, error } = useCalendarEvents();

  if (isLoading) {
    return (
      <GlassPanel>
        <div className={styles.loadingWrapper}>
          <Spinner label='Loading calendar…' />
        </div>
      </GlassPanel>
    );
  }

  if (error) {
    return (
      <MessageBar intent='error'>
        {error}
      </MessageBar>
    );
  }

  if (events.length === 0) {
    return (
      <GlassPanel>
        <Text className={styles.empty}>No upcoming events in the next 7 days.</Text>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel>
      <Text size={400} className={styles.heading}>Upcoming Events</Text>
      <div className={styles.root}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </GlassPanel>
  );
}
