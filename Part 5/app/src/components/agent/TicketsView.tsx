import { useState } from 'react';
import { makeStyles, tokens, Text, Button, Spinner, MessageBar } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { TicketRow } from './TicketRow';
import { GlassPanel } from '../shared/GlassPanel';
import { NewTicketDialog } from '../ticket/NewTicketDialog';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '12px',
  },
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
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 0',
  },
});

export function TicketsView() {
  const styles = useStyles();
  const { all, isLoading, error } = useTickets();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className={styles.toolbar}>
        <Button appearance="primary" onClick={() => setDialogOpen(true)}>New Ticket</Button>
      </div>

      {isLoading ? (
        <GlassPanel className={styles.panel}>
          <div className={styles.loadingWrapper}>
            <Spinner label="Loading tickets…" />
          </div>
        </GlassPanel>
      ) : error ? (
        <MessageBar intent="error">{error}</MessageBar>
      ) : (
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
      )}

      <NewTicketDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
