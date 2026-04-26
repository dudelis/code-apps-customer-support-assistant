/**
 * dataverseService — reads and writes Tickets, Customers, and Tasks.
 *
 * VITE_DATAVERSE_MODE=live  → calls the generated Dataverse services.
 * default (mock)             → reads from src/data/*; mutations are no-ops
 *                              so local dev works without a Dataverse connection.
 */

import type { Customer, Priority, Task, Ticket, TicketStatus } from '../types';
import { customers as mockCustomers } from '../data/customers';
import { tasks as mockTasks } from '../data/tasks';
import { tickets as mockTickets } from '../data/tickets';
import { Csa_customersService } from '../generated/services/Csa_customersService';
import { Csa_tasksService } from '../generated/services/Csa_tasksService';
import { Csa_ticketsService } from '../generated/services/Csa_ticketsService';
import type { Csa_customers } from '../generated/models/Csa_customersModel';
import type { Csa_tasks } from '../generated/models/Csa_tasksModel';
import type { Csa_tickets } from '../generated/models/Csa_ticketsModel';

const IS_LIVE = import.meta.env.VITE_DATAVERSE_MODE === 'live';

// ─── Option-set maps ──────────────────────────────────────────────────────────

const STATUS_BY_VALUE: Record<number, TicketStatus> = {
  100000000: 'New',
  100000001: 'Open',
  100000002: 'Assigned',
  100000003: 'In Progress',
  100000004: 'Waiting',
  100000005: 'Closed',
};

const PRIORITY_BY_VALUE: Record<number, Priority> = {
  100000000: 'Low',
  100000001: 'Medium',
  100000002: 'High',
  100000003: 'Critical',
};

const STATUS_TO_VALUE: Record<TicketStatus, number> = {
  'New': 100000000,
  'Open': 100000001,
  'Assigned': 100000002,
  'In Progress': 100000003,
  'Waiting': 100000004,
  'Closed': 100000005,
};

const PRIORITY_TO_VALUE: Record<Priority, number> = {
  'Low': 100000000,
  'Medium': 100000001,
  'High': 100000002,
  'Critical': 100000003,
};

// ─── Input types ──────────────────────────────────────────────────────────────

export interface NewTicketInput {
  title: string;
  priority: Priority;
  customerId?: string;
  summary?: string;
}

export interface NewCustomerInput {
  name: string;
  company?: string;
  role?: string;
  email?: string;
}

// ─── Reads ────────────────────────────────────────────────────────────────────

export async function fetchCustomers(): Promise<Customer[]> {
  if (!IS_LIVE) return mockCustomers;

  const result = await Csa_customersService.getAll({
    select: ['csa_customerid', 'csa_name', 'csa_company', 'csa_role', 'csa_email', 'csa_lastinteractiondate'],
    orderBy: ['csa_name asc'],
  });
  if (!result.success || !result.data) throw new Error('Failed to load customers from Dataverse.');
  return result.data.map(mapCustomer);
}

function mapCustomer(raw: Csa_customers): Customer {
  return {
    id: raw.csa_customerid,
    name: raw.csa_name,
    company: raw.csa_company ?? '',
    role: raw.csa_role ?? '',
    email: raw.csa_email ?? '',
    lastInteractionAt: raw.csa_lastinteractiondate ?? '',
  };
}

export async function fetchTickets(): Promise<Ticket[]> {
  if (!IS_LIVE) return mockTickets;

  const result = await Csa_ticketsService.getAll({
    select: [
      'csa_ticketid', 'csa_name', 'csa_assignedagent', 'csa_status', 'csa_priority',
      'csa_summary', 'createdon', 'modifiedon', '_csa_customerid_value',
    ],
    orderBy: ['modifiedon desc'],
  });
  if (!result.success || !result.data) throw new Error('Failed to load tickets from Dataverse.');
  return result.data.map(mapTicket);
}

function mapTicket(raw: Csa_tickets): Ticket {
  return {
    id: raw.csa_ticketid,
    title: raw.csa_name,
    customerId: raw._csa_customerid_value ?? '',
    assignedAgentId: raw.csa_assignedagent ?? null,
    status: raw.csa_status != null ? STATUS_BY_VALUE[raw.csa_status] ?? 'New' : 'New',
    priority: raw.csa_priority != null ? PRIORITY_BY_VALUE[raw.csa_priority] ?? 'Medium' : 'Medium',
    createdAt: raw.createdon ?? '',
    updatedAt: raw.modifiedon ?? '',
    summary: raw.csa_summary ?? '',
  };
}

export async function fetchTasks(): Promise<Task[]> {
  if (!IS_LIVE) return mockTasks;

  const result = await Csa_tasksService.getAll({
    select: ['csa_taskid', 'csa_name', 'csa_priority', 'csa_duedate', 'csa_isdone', '_csa_ticketid_value'],
    orderBy: ['csa_duedate asc'],
  });
  if (!result.success || !result.data) throw new Error('Failed to load tasks from Dataverse.');
  return result.data.map(mapTask);
}

function mapTask(raw: Csa_tasks): Task {
  return {
    id: raw.csa_taskid,
    title: raw.csa_name,
    ticketId: raw._csa_ticketid_value ?? null,
    priority: raw.csa_priority != null ? PRIORITY_BY_VALUE[raw.csa_priority] ?? 'Medium' : 'Medium',
    dueDate: raw.csa_duedate ? raw.csa_duedate.substring(0, 10) : '',
    done: raw.csa_isdone ?? false,
  };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createTicket(input: NewTicketInput): Promise<void> {
  if (!IS_LIVE) return;

  const payload = {
    csa_name: input.title,
    csa_status: STATUS_TO_VALUE['New'],
    csa_priority: PRIORITY_TO_VALUE[input.priority],
    ...(input.summary ? { csa_summary: input.summary } : {}),
    ...(input.customerId ? { 'csa_CustomerId@odata.bind': `/csa_customers(${input.customerId})` } : {}),
  };
  // ownerid and statecode are omitted — Dataverse defaults to current user / Active
  const result = await Csa_ticketsService.create(payload as unknown as Parameters<typeof Csa_ticketsService.create>[0]);
  if (!result.success) throw new Error('Failed to create ticket.');
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<void> {
  if (!IS_LIVE) return;
  const result = await Csa_ticketsService.update(id, { csa_status: STATUS_TO_VALUE[status] as unknown as Parameters<typeof Csa_ticketsService.update>[1]['csa_status'] });
  if (!result.success) throw new Error('Failed to update ticket status.');
}

export async function deleteTicket(id: string): Promise<void> {
  if (!IS_LIVE) return;
  await Csa_ticketsService.delete(id);
}

export async function updateTaskDone(id: string, done: boolean): Promise<void> {
  if (!IS_LIVE) return;
  const result = await Csa_tasksService.update(id, { csa_isdone: done });
  if (!result.success) throw new Error('Failed to update task.');
}

export async function createCustomer(input: NewCustomerInput): Promise<void> {
  if (!IS_LIVE) return;

  const payload = {
    csa_name: input.name,
    ...(input.company ? { csa_company: input.company } : {}),
    ...(input.role ? { csa_role: input.role } : {}),
    ...(input.email ? { csa_email: input.email } : {}),
  };
  // ownerid and statecode are omitted — Dataverse defaults to current user / Active
  const result = await Csa_customersService.create(payload as unknown as Parameters<typeof Csa_customersService.create>[0]);
  if (!result.success) throw new Error('Failed to create customer.');
}
