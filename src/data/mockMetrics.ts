import type { Metrics, ActivityEntry } from '../types';

export const mockMetrics: Metrics = {
  openTickets: 47,
  slaBreaches: 3,
  avgResolutionHours: 6.2,
};

export const mockActivity: ActivityEntry[] = [
  { id: 'act-001', ticketId: 'TKT-001', action: 'Ticket created', agent: 'System', timestamp: '2026-04-14T02:15:00Z' },
  { id: 'act-002', ticketId: 'TKT-001', action: 'Assigned to Sara Müller', agent: 'Max Becker', timestamp: '2026-04-14T08:00:00Z' },
  { id: 'act-003', ticketId: 'TKT-001', action: 'Status changed: New → In Progress', agent: 'Sara Müller', timestamp: '2026-04-14T08:30:00Z' },
  { id: 'act-004', ticketId: 'TKT-001', action: 'Root cause identified', agent: 'Sara Müller', timestamp: '2026-04-14T11:00:00Z' },
  { id: 'act-005', ticketId: 'TKT-002', action: 'Ticket created', agent: 'System', timestamp: '2026-04-15T09:00:00Z' },
  { id: 'act-006', ticketId: 'TKT-002', action: 'Assigned to Max Becker', agent: 'Sara Müller', timestamp: '2026-04-15T09:15:00Z' },
  { id: 'act-007', ticketId: 'TKT-002', action: 'Status changed: New → Open', agent: 'Max Becker', timestamp: '2026-04-15T10:30:00Z' },
  { id: 'act-008', ticketId: 'TKT-006', action: 'Ticket created', agent: 'System', timestamp: '2026-04-13T08:00:00Z' },
  { id: 'act-009', ticketId: 'TKT-006', action: 'Priority escalated to Critical', agent: 'Sara Müller', timestamp: '2026-04-13T08:30:00Z' },
  { id: 'act-010', ticketId: 'TKT-006', action: 'IAM specialist engaged', agent: 'Sara Müller', timestamp: '2026-04-13T08:45:00Z' },
];
