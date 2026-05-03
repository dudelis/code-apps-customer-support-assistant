import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { Ticket } from '../../types';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';
import { useCustomers } from '../../hooks/useCustomers';
import { agents } from '../../data/agents';

interface TicketOverlayHeaderProps {
  ticket: Ticket;
}

const useStyles = makeStyles({
  banner: {
    background: 'linear-gradient(135deg, #1a2744 0%, #1e1b4b 50%, #0f172a 100%)',
    borderBottom: '1px solid rgba(79,140,255,0.2)',
    padding: '28px 32px 24px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
    marginBottom: '12px',
    display: 'block',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  metaLabel: {
    color: tokens.colorNeutralForeground4,
  },
  metaValue: {
    color: tokens.colorNeutralForeground2,
  },
  divider: {
    color: 'rgba(255,255,255,0.2)',
  },
});

export function TicketOverlayHeader({ ticket }: TicketOverlayHeaderProps) {
  const styles = useStyles();
  const { byId } = useCustomers();
  const customer = byId(ticket.customerId);
  const assignedAgent = agents.find(a => a.id === ticket.assignedAgentId);

  return (
    <div className={styles.banner}>
      <Text size={500} weight="semibold" className={styles.title}>{ticket.title}</Text>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Text size={200} className={styles.metaLabel}>Customer:</Text>
          <Text size={200} className={styles.metaValue}>{customer?.name} · {customer?.company}</Text>
        </div>
        <Text size={200} className={styles.divider}>|</Text>
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        {assignedAgent && (
          <>
            <Text size={200} className={styles.divider}>|</Text>
            <div className={styles.metaItem}>
              <Text size={200} className={styles.metaLabel}>Assigned to:</Text>
              <Text size={200} className={styles.metaValue}>{assignedAgent.name}</Text>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
