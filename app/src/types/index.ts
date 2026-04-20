export type TicketStatus = 'New' | 'Open' | 'Assigned' | 'In Progress' | 'Waiting' | 'Closed';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Role = 'agent' | 'manager';
export type AgentNavView = 'tickets' | 'kanban' | 'customers';
export type OverlayTab = 'summary' | 'activity' | 'messages' | 'customer';

export interface Ticket {
  id: string;
  title: string;
  customerId: string;
  assignedAgentId: string | null;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  summary: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  lastInteractionAt: string;
}

export interface Task {
  id: string;
  title: string;
  ticketId: string | null;
  priority: Priority;
  dueDate: string;
  done: boolean;
}

export interface Message {
  id: string;
  ticketId: string;
  sender: 'customer' | 'agent';
  senderName: string;
  body: string;
  sentAt: string;
}

export interface Agent {
  id: string;
  name: string;
  initials: string;
}

export interface Metrics {
  openTickets: number;
  slaBreaches: number;
  avgResolutionHours: number;
  resolvedThisWeek: number;
}

export interface ActivityEntry {
  id: string;
  ticketId: string;
  description: string;
  timestamp: string;
}
