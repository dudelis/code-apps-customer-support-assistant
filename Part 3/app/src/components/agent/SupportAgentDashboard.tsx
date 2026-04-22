import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { AgentNavTabs } from './AgentNavTabs';
import { TicketsView } from './TicketsView';
import { KanbanView } from './KanbanView';
import { CustomersView } from './CustomersView';
import { CalendarView } from './CalendarView';
import { MyTasksSidebar } from './MyTasksSidebar';
import type { AgentNavView } from '../../types';

const useStyles = makeStyles({
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '20px',
    height: '100%',
    minHeight: '0',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    overflowY: 'auto',
  },
  sidebar: {
    height: '100%',
    minHeight: '0',
    overflow: 'hidden',
  },
});

export function SupportAgentDashboard() {
  const styles = useStyles();
  const [activeView, setActiveView] = useState<AgentNavView>('tickets');

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <AgentNavTabs activeView={activeView} onViewChange={setActiveView} />
        {activeView === 'tickets' && <TicketsView />}
        {activeView === 'kanban' && <KanbanView />}
        {activeView === 'customers' && <CustomersView />}
        {activeView === 'calendar' && <CalendarView />}
      </div>
      <div className={styles.sidebar}>
        <MyTasksSidebar />
      </div>
    </div>
  );
}
