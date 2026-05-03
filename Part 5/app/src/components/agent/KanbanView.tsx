import { makeStyles, Spinner, MessageBar } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { KanbanColumn } from './KanbanColumn';
import type { TicketStatus } from '../../types';

const COLUMNS: TicketStatus[] = ['New', 'Open', 'Assigned', 'In Progress', 'Waiting', 'Closed'];

const useStyles = makeStyles({
  board: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '12px',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 0',
  },
});

export function KanbanView() {
  const styles = useStyles();
  const { byStatus, isLoading, error } = useTickets();

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <Spinner label="Loading board…" />
      </div>
    );
  }

  if (error) {
    return <MessageBar intent="error">{error}</MessageBar>;
  }

  return (
    <div className={styles.board}>
      {COLUMNS.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tickets={byStatus.get(status) ?? []}
        />
      ))}
    </div>
  );
}
