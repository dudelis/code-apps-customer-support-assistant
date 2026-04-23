export type TicketStatus = 'New' | 'Open' | 'Assigned' | 'In Progress' | 'Waiting' | 'Closed';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Role = 'agent' | 'manager';
export type AgentNavView = 'tickets' | 'kanban' | 'customers' | 'calendar';
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

export interface UserProfile {
  id: string;
  displayName: string;
  jobTitle: string;
  /** Base64 data URL or HTTP URL; null means show initials fallback */
  photoUrl: string | null;
  email: string;
}

export interface CalendarEventDateTime {
  dateTime: string;   // ISO 8601 (e.g. "2026-04-21T14:00:00")
  timeZone: string;   // IANA tz (e.g. "Europe/Berlin")
}

export interface CalendarEvent {
  id: string;
  subject: string;
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
  isAllDay: boolean;
  organizer: string;
  attendees: string[];
  isOnlineMeeting: boolean;
}
