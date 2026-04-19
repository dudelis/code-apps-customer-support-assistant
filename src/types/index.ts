export type Role = 'agent' | 'manager' | 'flow';
export type AgentView = 'tickets' | 'kanban' | 'customers';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'New' | 'Open' | 'Assigned' | 'In Progress' | 'Waiting' | 'Closed';

export interface Ticket {
  id: string;
  title: string;
  customer: string;
  customerId: string;
  status: TicketStatus;
  priority: Priority;
  createdDate: string;
  assignedAgent: string;
  summary: string;
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  ticketId: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  lastInteraction: string;
}

export interface Message {
  id: string;
  ticketId: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'email' | 'chat';
  isAgent: boolean;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
}

export interface Metrics {
  openTickets: number;
  slaBreaches: number;
  avgResolutionHours: number;
}

export interface ActivityEntry {
  id: string;
  ticketId: string;
  action: string;
  agent: string;
  timestamp: string;
}
