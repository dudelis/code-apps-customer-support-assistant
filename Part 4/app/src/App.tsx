import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import type { Role } from './types';
import { ShellBar } from './components/shell/ShellBar';
import { SupportAgentDashboard } from './components/agent/SupportAgentDashboard';
import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { TicketOverlay } from './components/ticket/TicketOverlay';
import { TicketOverlayContext, useTicketOverlayState } from './hooks/useTicketOverlay';
import { TicketsContext, useTicketsState } from './hooks/useTickets';
import { CustomersContext, useCustomersState } from './hooks/useCustomers';
import { TasksContext, useTasksState } from './hooks/useTasks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: '#0d0f14',
  },
  main: {
    flex: '1',
    marginTop: '56px',
    padding: '24px',
    overflowY: 'auto',
    minHeight: '0',
  },
});

export default function App() {
  const styles = useStyles();
  const [role, setRole] = useState<Role>('agent');
  const overlayState = useTicketOverlayState();
  const ticketsState = useTicketsState();
  const customersState = useCustomersState();
  const tasksState = useTasksState();

  return (
    <TicketsContext.Provider value={ticketsState}>
      <CustomersContext.Provider value={customersState}>
        <TasksContext.Provider value={tasksState}>
          <TicketOverlayContext.Provider value={overlayState}>
            <div className={styles.root}>
              <ShellBar role={role} onRoleChange={setRole} />
              <main className={styles.main}>
                {role === 'agent' ? <SupportAgentDashboard /> : <ManagerDashboard />}
              </main>
              <TicketOverlay />
            </div>
          </TicketOverlayContext.Provider>
        </TasksContext.Provider>
      </CustomersContext.Provider>
    </TicketsContext.Provider>
  );
}
