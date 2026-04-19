import { TabList, Tab } from '@fluentui/react-components';
import type { AgentView, Task } from '../../types';
import { TicketsView } from './TicketsView';
import { KanbanView } from './KanbanView';
import { CustomersView } from './CustomersView';
import { TasksSidebar } from './TasksSidebar';

interface AgentDashboardProps {
  agentView: AgentView;
  setAgentView: (view: AgentView) => void;
  tasks: Task[];
  taskSortBy: 'date' | 'priority';
  setTaskSortBy: (sort: 'date' | 'priority') => void;
  toggleTask: (id: string) => void;
  onSelectTicket: (id: string) => void;
}

export function AgentDashboard({
  agentView,
  setAgentView,
  tasks,
  taskSortBy,
  setTaskSortBy,
  toggleTask,
  onSelectTicket,
}: AgentDashboardProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '70fr 30fr',
      gap: 20,
      height: '100%',
      minHeight: 0,
    }}>
      {/* Left panel */}
      <div style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-glass)',
        borderRadius: 16,
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Segmented nav */}
        <div style={{ padding: '16px 20px 0', borderBottom: '1px solid var(--border-glass)' }}>
          <TabList
            selectedValue={agentView}
            onTabSelect={(_, data) => setAgentView(data.value as AgentView)}
            appearance="subtle"
          >
            <Tab value="tickets">📋 Tickets</Tab>
            <Tab value="kanban">📊 Kanban</Tab>
            <Tab value="customers">👥 Customers</Tab>
          </TabList>
        </div>

        {/* View content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: agentView === 'kanban' ? 'auto' : 'hidden', padding: '20px' }}>
          {agentView === 'tickets' && <TicketsView onSelectTicket={onSelectTicket} />}
          {agentView === 'kanban' && <KanbanView onSelectTicket={onSelectTicket} />}
          {agentView === 'customers' && <CustomersView onSelectTicket={onSelectTicket} />}
        </div>
      </div>

      {/* Right sidebar */}
      <div style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-glass)',
        borderRadius: 16,
        backdropFilter: 'blur(12px)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <TasksSidebar
          tasks={tasks}
          taskSortBy={taskSortBy}
          setTaskSortBy={setTaskSortBy}
          toggleTask={toggleTask}
          onSelectTicket={onSelectTicket}
        />
      </div>

    </div>
  );
}
