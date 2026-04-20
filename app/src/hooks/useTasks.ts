import { useMemo } from 'react';
import { tasks as rawTasks } from '../data/tasks';
import type { Priority } from '../types';

export function useTasks() {
  const all = useMemo(() => rawTasks, []);
  const sortByDate = () => [...all].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const priorityOrder: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const sortByPriority = () => [...all].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  return { all, sortByDate, sortByPriority };
}
