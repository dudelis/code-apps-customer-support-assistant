import { makeStyles } from '@fluentui/react-components';
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
});

export function KanbanView() {
  const styles = useStyles();
  const { byStatus } = useTickets();

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
