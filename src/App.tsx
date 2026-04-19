import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { useAppState } from './hooks/useAppState';
import { ShellBar } from './components/ShellBar';
import { AgentDashboard } from './components/agent/AgentDashboard';
import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { TicketOverlay } from './components/shared/TicketOverlay';
import { FlowPanel } from './components/shared/FlowPanel';
import { ConnectorFlowPanel } from './components/shared/ConnectorFlowPanel';

export default function App() {
  const state = useAppState();

  return (
    <FluentProvider theme={webDarkTheme}>
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
        <ShellBar role={state.role} onRoleChange={state.setRole} />

        <main style={{
          paddingTop: 72,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 24,
          height: '100vh',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto',
        }}>
          {state.role === 'agent' ? (
            <AgentDashboard
              agentView={state.agentView}
              setAgentView={state.setAgentView}
              tasks={state.tasks}
              taskSortBy={state.taskSortBy}
              setTaskSortBy={state.setTaskSortBy}
              toggleTask={state.toggleTask}
              onSelectTicket={state.setSelectedTicketId}
            />
          ) : state.role === 'manager' ? (
            <ManagerDashboard onSelectTicket={state.setSelectedTicketId} />
          ) : (
            <>
              <FlowPanel />
              <ConnectorFlowPanel />
            </>
          )}
        </main>

        {state.selectedTicketId && (
          <TicketOverlay
            ticketId={state.selectedTicketId}
            onClose={() => state.setSelectedTicketId(null)}
          />
        )}
      </div>
    </FluentProvider>
  );
}
