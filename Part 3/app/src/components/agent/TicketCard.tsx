import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { Ticket } from '../../types';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';
import { useCustomers } from '../../hooks/useCustomers';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';

interface TicketCardProps {
  ticket: Ticket;
}

const useStyles = makeStyles({
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    ':hover': {
      background: 'rgba(79,140,255,0.08)',
      border: '1px solid rgba(79,140,255,0.3)',
      transform: 'translateY(-1px)',
    },
  },
  title: {
    color: tokens.colorNeutralForeground1,
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  customer: {
    color: tokens.colorNeutralForeground3,
    marginBottom: '8px',
  },
  badges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
});

export function TicketCard({ ticket }: TicketCardProps) {
  const styles = useStyles();
  const { byId } = useCustomers();
  const { openOverlay } = useTicketOverlay();
  const customer = byId(ticket.customerId);

  return (
    <div className={styles.card} onClick={() => openOverlay(ticket.id)}>
      <Text size={200} weight="semibold" className={styles.title}>{ticket.title}</Text>
      <Text size={100} className={styles.customer}>{customer?.name}</Text>
      <div className={styles.badges}>
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
      </div>
    </div>
  );
}
