import type { ActivityEntry } from '../types';

export const activity: ActivityEntry[] = [
  { id: 'ac1', ticketId: 't1', description: 'Ticket created and assigned to Lena Hoffmann', timestamp: '2026-04-15T08:05:00Z' },
  { id: 'ac2', ticketId: 't1', description: 'Status changed: New → Assigned', timestamp: '2026-04-15T09:00:00Z' },
  { id: 'ac3', ticketId: 't1', description: 'Status changed: Assigned → In Progress', timestamp: '2026-04-15T11:00:00Z' },
  { id: 'ac4', ticketId: 't1', description: 'Certificate chain analysis completed — fix in testing', timestamp: '2026-04-19T10:00:00Z' },

  { id: 'ac5', ticketId: 't2', description: 'Ticket created — P1 escalation triggered', timestamp: '2026-04-18T07:35:00Z' },
  { id: 'ac6', ticketId: 't2', description: 'Assigned to Marco Richter', timestamp: '2026-04-18T07:40:00Z' },
  { id: 'ac7', ticketId: 't2', description: 'SAP vendor case opened: #SAP-2026-04182', timestamp: '2026-04-18T08:30:00Z' },

  { id: 'ac8', ticketId: 't6', description: 'Ticket created — pipeline block detected', timestamp: '2026-04-19T04:05:00Z' },
  { id: 'ac9', ticketId: 't6', description: 'Root cause identified: .NET runtime update', timestamp: '2026-04-19T06:00:00Z' },
  { id: 'ac10', ticketId: 't6', description: 'Runtime rolled back — agents restarting', timestamp: '2026-04-19T06:30:00Z' },
  { id: 'ac11', ticketId: 't6', description: 'All pipelines restored — ticket In Progress for documentation', timestamp: '2026-04-20T08:10:00Z' },

  { id: 'ac12', ticketId: 't14', description: 'Ticket created — 6h sync delay reported', timestamp: '2026-04-19T12:05:00Z' },
  { id: 'ac13', ticketId: 't14', description: 'Delta sync queue backlog confirmed: 47,000 objects', timestamp: '2026-04-19T13:00:00Z' },
  { id: 'ac14', ticketId: 't14', description: 'Escalated to AAD Connect team', timestamp: '2026-04-19T13:35:00Z' },
];
