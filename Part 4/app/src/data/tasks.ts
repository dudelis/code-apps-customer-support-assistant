import type { Task } from '../types';

export const tasks: Task[] = [
  { id: 'tk1', title: 'Review certificate chain on VPN gateway', ticketId: 't1', priority: 'High', dueDate: '2026-04-21', done: false },
  { id: 'tk2', title: 'Escalate SAP connection pool issue to vendor', ticketId: 't2', priority: 'Critical', dueDate: '2026-04-20', done: false },
  { id: 'tk3', title: 'Reset Power BI gateway credentials', ticketId: 't3', priority: 'Medium', dueDate: '2026-04-22', done: false },
  { id: 'tk4', title: 'Restart Azure DevOps agent service', ticketId: 't6', priority: 'Critical', dueDate: '2026-04-20', done: true },
  { id: 'tk5', title: 'Request SharePoint quota increase via admin portal', ticketId: 't7', priority: 'Medium', dueDate: '2026-04-21', done: false },
  { id: 'tk6', title: 'Run network trace on Frankfurt router', ticketId: 't8', priority: 'High', dueDate: '2026-04-21', done: false },
  { id: 'tk7', title: 'Draft OneDrive path migration guide', ticketId: 't10', priority: 'Medium', dueDate: '2026-04-23', done: false },
  { id: 'tk8', title: 'Fix Exchange hybrid connector certificate thumbprint', ticketId: 't17', priority: 'Critical', dueDate: '2026-04-20', done: false },
  { id: 'tk9', title: 'Update weekly status report for manager', ticketId: null, priority: 'Low', dueDate: '2026-04-21', done: false },
];
