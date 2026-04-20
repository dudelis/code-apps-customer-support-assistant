import { makeStyles, tokens, Text, Avatar } from '@fluentui/react-components';
import type { Ticket } from '../../types';
import { useCustomers } from '../../hooks/useCustomers';
import { GlassPanel } from '../shared/GlassPanel';

interface TicketCustomerInfoTabProps {
  ticket: Ticket;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  name: {
    color: tokens.colorNeutralForeground1,
    display: 'block',
  },
  company: {
    color: '#4F8CFF',
    fontWeight: tokens.fontWeightSemibold,
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    color: tokens.colorNeutralForeground4,
  },
  value: {
    color: tokens.colorNeutralForeground2,
  },
});

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export function TicketCustomerInfoTab({ ticket }: TicketCustomerInfoTabProps) {
  const styles = useStyles();
  const { byId } = useCustomers();
  const customer = byId(ticket.customerId);

  if (!customer) return <Text size={300}>Customer not found.</Text>;

  return (
    <div className={styles.container}>
      <GlassPanel>
        <div className={styles.top}>
          <Avatar name={customer.name} color="brand" size={48} />
          <div>
            <Text size={400} weight="semibold" className={styles.name}>{customer.name}</Text>
            <Text size={300} className={styles.company}>{customer.company}</Text>
          </div>
        </div>
      </GlassPanel>
      <GlassPanel>
        <div className={styles.fields}>
          <div className={styles.field}>
            <Text size={100} className={styles.label}>Role</Text>
            <Text size={300} className={styles.value}>{customer.role}</Text>
          </div>
          <div className={styles.field}>
            <Text size={100} className={styles.label}>Email</Text>
            <Text size={300} className={styles.value}>{customer.email}</Text>
          </div>
          <div className={styles.field}>
            <Text size={100} className={styles.label}>Company</Text>
            <Text size={300} className={styles.value}>{customer.company}</Text>
          </div>
          <div className={styles.field}>
            <Text size={100} className={styles.label}>Last Interaction</Text>
            <Text size={300} className={styles.value}>{timeAgo(customer.lastInteractionAt)}</Text>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
