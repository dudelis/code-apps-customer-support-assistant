/**
 * dataverseService — reads tickets, customers, and tasks from Dataverse.
 *
 * Modes:
 *   - Default (mock)  : returns data from `src/data/*` so `npm run dev` works
 *                        without a live Dataverse connection.
 *   - VITE_DATAVERSE_MODE=live : queries the live environment via the generated
 *                        services in `src/generated/services/Csa_*Service.ts`.
 *
 * The three `fetch*` functions return app-domain types (Ticket/Customer/Task)
 * so hooks and components never see raw Dataverse shapes.
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

// Option-set integer values → app string literal types.
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

// ─── Customers ───────────────────────────────────────────────────────────────

export async function fetchCustomers(): Promise<Customer[]> {
  if (!IS_LIVE) {
    return mockCustomers;
  }

  const result = await Csa_customersService.getAll({
    select: ['csa_customerid', 'csa_name', 'csa_company', 'csa_role', 'csa_email', 'csa_lastinteractiondate'],
    orderBy: ['csa_name asc'],
  });

  if (!result.success || !result.data) {
    throw new Error('Failed to load customers from Dataverse.');
  }

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

// ─── Tickets ─────────────────────────────────────────────────────────────────

export async function fetchTickets(): Promise<Ticket[]> {
  if (!IS_LIVE) {
    return mockTickets;
  }

  const result = await Csa_ticketsService.getAll({
    select: [
      'csa_ticketid',
      'csa_name',
      'csa_assignedagent',
      'csa_status',
      'csa_priority',
      'csa_summary',
      'createdon',
      'modifiedon',
      '_csa_customerid_value',
    ],
    orderBy: ['modifiedon desc'],
  });

  if (!result.success || !result.data) {
    throw new Error('Failed to load tickets from Dataverse.');
  }

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

// ─── Tasks ───────────────────────────────────────────────────────────────────

export async function fetchTasks(): Promise<Task[]> {
  if (!IS_LIVE) {
    return mockTasks;
  }

  const result = await Csa_tasksService.getAll({
    select: [
      'csa_taskid',
      'csa_name',
      'csa_priority',
      'csa_duedate',
      'csa_isdone',
      '_csa_ticketid_value',
    ],
    orderBy: ['csa_duedate asc'],
  });

  if (!result.success || !result.data) {
    throw new Error('Failed to load tasks from Dataverse.');
  }

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
