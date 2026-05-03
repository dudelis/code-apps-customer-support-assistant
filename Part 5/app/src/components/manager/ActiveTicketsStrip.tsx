import { makeStyles, tokens, Text, Spinner, MessageBar } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { useCustomers } from '../../hooks/useCustomers';
import { PriorityBadge } from '../shared/PriorityBadge';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  scroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  card: {
    minWidth: '220px',
    maxWidth: '260px',
    flexShrink: '0',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    ':hover': {
      background: 'rgba(79,140,255,0.08)',
      border: '1px solid rgba(79,140,255,0.25)',
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
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 0',
  },
});

export function ActiveTicketsStrip() {
  const styles = useStyles();
  const { byStatus, isLoading: ticketsLoading, error: ticketsError } = useTickets();
  const { byId, isLoading: customersLoading, error: customersError } = useCustomers();
  const { openOverlay } = useTicketOverlay();

  const isLoading = ticketsLoading || customersLoading;
  const error = ticketsError ?? customersError;

  if (isLoading) {
    return (
      <div className={styles.section}>
        <Text size={400} weight="semibold">Active Tickets</Text>
        <div className={styles.loadingWrapper}>
          <Spinner label="Loading…" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Text size={400} weight="semibold">Active Tickets</Text>
        <MessageBar intent="error">{error}</MessageBar>
      </div>
    );
  }

  const active = [
    ...(byStatus.get('In Progress') ?? []),
    ...(byStatus.get('Open') ?? []),
    ...(byStatus.get('Assigned') ?? []),
  ].slice(0, 8);

  return (
    <div className={styles.section}>
      <Text size={400} weight="semibold">Active Tickets</Text>
      <div className={styles.scroll}>
        {active.map(ticket => {
          const customer = byId(ticket.customerId);
          return (
            <div key={ticket.id} className={styles.card} onClick={() => openOverlay(ticket.id)}>
              <Text size={200} weight="semibold" className={styles.title}>{ticket.title}</Text>
              <Text size={100} className={styles.customer}>{customer?.name} · {customer?.company}</Text>
              <PriorityBadge priority={ticket.priority} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
