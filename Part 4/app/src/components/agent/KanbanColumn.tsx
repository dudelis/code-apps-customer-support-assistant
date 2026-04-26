import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { Ticket, TicketStatus } from '../../types';
import { TicketCard } from './TicketCard';

interface KanbanColumnProps {
  status: TicketStatus;
  tickets: Ticket[];
}

const statusColors: Record<TicketStatus, string> = {
  New: '#4F8CFF',
  Open: '#f59e0b',
  Assigned: '#8b5cf6',
  'In Progress': '#10b981',
  Waiting: '#6b7280',
  Closed: '#374151',
};

const useStyles = makeStyles({
  column: {
    minWidth: '220px',
    maxWidth: '260px',
    flexShrink: '0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: '0',
  },
  count: {
    marginLeft: 'auto',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1px 8px',
    color: tokens.colorNeutralForeground3,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  empty: {
    color: tokens.colorNeutralForeground4,
    textAlign: 'center',
    padding: '24px 12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: '1px dashed rgba(255,255,255,0.06)',
  },
});

export function KanbanColumn({ status, tickets }: KanbanColumnProps) {
  const styles = useStyles();
  const color = statusColors[status];

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.dot} style={{ background: color }} />
        <Text size={200} weight="semibold">{status}</Text>
        <Text size={100} className={styles.count}>{tickets.length}</Text>
      </div>
      <div className={styles.cards}>
        {tickets.length === 0 ? (
          <Text size={100} className={styles.empty}>No tickets</Text>
        ) : (
          tickets.map(t => <TicketCard key={t.id} ticket={t} />)
        )}
      </div>
    </div>
  );
}
