import { useState } from 'react';
import type { Role, AgentView, Task } from '../types';
import { mockTasks } from '../data/mockTasks';

export function useAppState() {
  const [role, setRole] = useState<Role>('agent');
  const [agentView, setAgentView] = useState<AgentView>('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [taskSortBy, setTaskSortBy] = useState<'date' | 'priority'>('date');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  function toggleTask(taskId: string) {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }

  return {
    role,
    setRole,
    agentView,
    setAgentView,
    selectedTicketId,
    setSelectedTicketId,
    taskSortBy,
    setTaskSortBy,
    tasks,
    toggleTask,
  };
}
