import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { Ticket } from '../../types';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';
import { useCustomers } from '../../hooks/useCustomers';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';

interface TicketRowProps {
  ticket: Ticket;
}

const useStyles = makeStyles({
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 160px 110px 100px 120px',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    ':hover': {
      background: 'rgba(79,140,255,0.06)',
    },
  },
  title: {
    color: tokens.colorNeutralForeground1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  meta: {
    color: tokens.colorNeutralForeground3,
  },
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function TicketRow({ ticket }: TicketRowProps) {
  const styles = useStyles();
  const { byId } = useCustomers();
  const { openOverlay } = useTicketOverlay();
  const customer = byId(ticket.customerId);

  return (
    <div className={styles.row} onClick={() => openOverlay(ticket.id)}>
      <Text size={300} className={styles.title}>{ticket.title}</Text>
      <Text size={200} className={styles.meta}>{customer?.name ?? '—'}</Text>
      <StatusBadge status={ticket.status} />
      <PriorityBadge priority={ticket.priority} />
      <Text size={200} className={styles.meta}>{formatDate(ticket.createdAt)}</Text>
    </div>
  );
}
