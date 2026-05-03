import { makeStyles, tokens, Text, Avatar, Button } from '@fluentui/react-components';
import type { Customer } from '../../types';

interface CustomerCardProps {
  customer: Customer;
}

const useStyles = makeStyles({
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.15s ease',
    ':hover': {
      background: 'rgba(79,140,255,0.06)',
      border: '1px solid rgba(79,140,255,0.25)',
    },
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  info: {
    flex: '1',
    minWidth: '0',
  },
  name: {
    color: tokens.colorNeutralForeground1,
    display: 'block',
  },
  company: {
    color: '#4F8CFF',
    fontWeight: tokens.fontWeightSemibold,
  },
  role: {
    color: tokens.colorNeutralForeground3,
  },
  email: {
    color: tokens.colorNeutralForeground3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  interaction: {
    color: tokens.colorNeutralForeground4,
  },
});

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const styles = useStyles();
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <Avatar name={customer.name} color="brand" size={40} />
        <div className={styles.info}>
          <Text size={300} weight="semibold" className={styles.name}>{customer.name}</Text>
          <Text size={200} className={styles.company}>{customer.company}</Text>
        </div>
      </div>
      <Text size={200} className={styles.role}>{customer.role}</Text>
      <Text size={200} className={styles.email}>{customer.email}</Text>
      <Text size={100} className={styles.interaction}>Last interaction: {timeAgo(customer.lastInteractionAt)}</Text>
      <Button size="small" appearance="subtle">View Details</Button>
    </div>
  );
}
