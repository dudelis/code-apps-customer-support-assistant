import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { activity } from '../../data/activity';

interface TicketActivityTabProps {
  ticketId: string;
}

const useStyles = makeStyles({
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  entry: {
    display: 'flex',
    gap: '16px',
    paddingBottom: '20px',
    position: 'relative',
  },
  lineCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20px',
    flexShrink: '0',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#4F8CFF',
    border: '2px solid rgba(79,140,255,0.3)',
    marginTop: '4px',
    flexShrink: '0',
  },
  line: {
    flex: '1',
    width: '1px',
    background: 'rgba(255,255,255,0.08)',
    marginTop: '4px',
  },
  content: {
    flex: '1',
    paddingBottom: '4px',
  },
  description: {
    color: tokens.colorNeutralForeground2,
  },
  timestamp: {
    color: tokens.colorNeutralForeground4,
    marginTop: '4px',
  },
});

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function TicketActivityTab({ ticketId }: TicketActivityTabProps) {
  const styles = useStyles();
  const entries = activity.filter(a => a.ticketId === ticketId);

  if (entries.length === 0) {
    return <Text size={300}>No activity recorded for this ticket.</Text>;
  }

  return (
    <div className={styles.timeline}>
      {entries.map((entry, i) => (
        <div key={entry.id} className={styles.entry}>
          <div className={styles.lineCol}>
            <div className={styles.dot} />
            {i < entries.length - 1 && <div className={styles.line} />}
          </div>
          <div className={styles.content}>
            <Text size={300} className={styles.description}>{entry.description}</Text>
            <Text size={100} block className={styles.timestamp}>{formatTimestamp(entry.timestamp)}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
