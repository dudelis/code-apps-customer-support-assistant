import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { useCustomers } from '../../hooks/useCustomers';
import { StatusBadge } from '../shared/StatusBadge';
import { GlassPanel } from '../shared/GlassPanel';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(239,68,68,0.06)',
    border: '1px solid rgba(239,68,68,0.15)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    ':hover': {
      background: 'rgba(239,68,68,0.12)',
    },
  },
  criticalDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ef4444',
    flexShrink: '0',
    boxShadow: '0 0 6px rgba(239,68,68,0.6)',
  },
  title: {
    flex: '1',
    color: tokens.colorNeutralForeground1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  customer: {
    color: tokens.colorNeutralForeground3,
    flexShrink: '0',
  },
});

export function CriticalIssuesPanel() {
  const styles = useStyles();
  const { byPriority } = useTickets();
  const { byId } = useCustomers();
  const { openOverlay } = useTicketOverlay();
  const criticals = byPriority('Critical').filter(t => t.status !== 'Closed');

  if (criticals.length === 0) return null;

  return (
    <GlassPanel>
      <div className={styles.section}>
        <Text size={400} weight="semibold" style={{ color: '#ef4444' }}>Critical Issues</Text>
        <div className={styles.list}>
          {criticals.map(ticket => {
            const customer = byId(ticket.customerId);
            return (
              <div key={ticket.id} className={styles.item} onClick={() => openOverlay(ticket.id)}>
                <div className={styles.criticalDot} />
                <Text size={300} className={styles.title}>{ticket.title}</Text>
                <Text size={200} className={styles.customer}>{customer?.company}</Text>
                <StatusBadge status={ticket.status} />
              </div>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}
