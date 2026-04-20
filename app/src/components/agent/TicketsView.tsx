import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { TicketRow } from './TicketRow';
import { GlassPanel } from '../shared/GlassPanel';

const useStyles = makeStyles({
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr 160px 110px 100px 120px',
    gap: '12px',
    padding: '10px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  headerCell: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  panel: {
    padding: '0',
    overflow: 'hidden',
  },
});

export function TicketsView() {
  const styles = useStyles();
  const { all } = useTickets();

  return (
    <GlassPanel className={styles.panel}>
      <div className={styles.header}>
        <Text size={100} className={styles.headerCell}>Title</Text>
        <Text size={100} className={styles.headerCell}>Customer</Text>
        <Text size={100} className={styles.headerCell}>Status</Text>
        <Text size={100} className={styles.headerCell}>Priority</Text>
        <Text size={100} className={styles.headerCell}>Created</Text>
      </div>
      {all.map(ticket => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </GlassPanel>
  );
}
