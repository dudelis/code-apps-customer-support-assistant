import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchTickets,
  createTicket as createTicketService,
  updateTicketStatus,
  deleteTicket as deleteTicketService,
} from '../services/dataverseService';
import type { NewTicketInput } from '../services/dataverseService';
import type { Ticket, TicketStatus, Priority } from '../types';

interface TicketsContextValue {
  all: Ticket[];
  isLoading: boolean;
  error: string | null;
  byStatus: Map<TicketStatus, Ticket[]>;
  byPriority: (priority: Priority) => Ticket[];
  createTicket: (input: NewTicketInput) => Promise<void>;
  updateStatus: (id: string, status: TicketStatus) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
}

export const TicketsContext = createContext<TicketsContextValue>({
  all: [],
  isLoading: false,
  error: null,
  byStatus: new Map(),
  byPriority: () => [],
  createTicket: async () => {},
  updateStatus: async () => {},
  deleteTicket: async () => {},
});

export function useTicketsState(): TicketsContextValue {
  const [all, setAll] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchTickets()
      .then(setAll)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load tickets.'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const byStatus = useMemo(() => {
    const map = new Map<TicketStatus, Ticket[]>();
    for (const t of all) {
      const list = map.get(t.status) ?? [];
      list.push(t);
      map.set(t.status, list);
    }
    return map;
  }, [all]);

  const byPriority = useCallback(
    (priority: Priority) => all.filter(t => t.priority === priority),
    [all],
  );

  const createTicket = useCallback(async (input: NewTicketInput) => {
    await createTicketService(input);
    load();
  }, [load]);

  const updateStatus = useCallback(async (id: string, status: TicketStatus) => {
    setAll(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    await updateTicketStatus(id, status);
  }, []);

  const deleteTicket = useCallback(async (id: string) => {
    setAll(prev => prev.filter(t => t.id !== id));
    await deleteTicketService(id);
  }, []);

  return { all, isLoading, error, byStatus, byPriority, createTicket, updateStatus, deleteTicket };
}

export function useTickets(): TicketsContextValue {
  return useContext(TicketsContext);
}
