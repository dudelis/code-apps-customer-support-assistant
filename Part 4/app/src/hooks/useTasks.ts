import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchTasks, updateTaskDone } from '../services/dataverseService';
import type { Task, Priority } from '../types';

interface TasksContextValue {
  all: Task[];
  isLoading: boolean;
  error: string | null;
  sortByDate: () => Task[];
  sortByPriority: () => Task[];
  setTaskDone: (id: string, done: boolean) => Promise<void>;
}

export const TasksContext = createContext<TasksContextValue>({
  all: [],
  isLoading: false,
  error: null,
  sortByDate: () => [],
  sortByPriority: () => [],
  setTaskDone: async () => {},
});

export function useTasksState(): TasksContextValue {
  const [all, setAll] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then(setAll)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load tasks.'))
      .finally(() => setIsLoading(false));
  }, []);

  const priorityOrder: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

  const sortByDate = useCallback(() => [...all].sort((a, b) => a.dueDate.localeCompare(b.dueDate)), [all]);
  const sortByPriority = useCallback(
    () => [...all].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
    [all], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setTaskDone = useCallback(async (id: string, done: boolean) => {
    setAll(prev => prev.map(t => t.id === id ? { ...t, done } : t));
    await updateTaskDone(id, done);
  }, []);

  return { all, isLoading, error, sortByDate, sortByPriority, setTaskDone };
}

export function useTasks(): TasksContextValue {
  return useContext(TasksContext);
}
