import { useMemo } from 'react';
import { tickets } from '../data/tickets';
import type { TicketStatus, Priority } from '../types';

export function useTickets() {
  const all = useMemo(() => tickets, []);

  const byStatus = useMemo(() => {
    const map = new Map<TicketStatus, typeof tickets>();
    for (const t of tickets) {
      const list = map.get(t.status) ?? [];
      list.push(t);
      map.set(t.status, list);
    }
    return map;
  }, []);

  const byPriority = (priority: Priority) => all.filter(t => t.priority === priority);

  return { all, byStatus, byPriority };
}
