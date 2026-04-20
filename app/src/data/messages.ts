import type { Message } from '../types';

export const messages: Message[] = [
  { id: 'm1', ticketId: 't1', sender: 'customer', senderName: 'Klaus Weber', body: 'We have completely lost VPN access across our Munich campus since the migration. Over 200 people cannot connect. This is blocking production work.', sentAt: '2026-04-15T08:00:00Z' },
  { id: 'm2', ticketId: 't1', sender: 'agent', senderName: 'Lena Hoffmann', body: 'Thank you Klaus. I have raised this as high priority and started investigating. I can see the certificate chain issue from our diagnostics — working on the fix now.', sentAt: '2026-04-15T09:30:00Z' },
  { id: 'm3', ticketId: 't1', sender: 'customer', senderName: 'Klaus Weber', body: 'Any update? The situation is getting critical. We have had to ask 200 employees to work from office today which is causing significant disruption.', sentAt: '2026-04-19T08:00:00Z' },
  { id: 'm4', ticketId: 't1', sender: 'agent', senderName: 'Lena Hoffmann', body: 'I understand the urgency. The remediation is in the final testing phase — we expect full restoration by end of business today. I will send you a confirmation as soon as it is live.', sentAt: '2026-04-19T10:00:00Z' },

  { id: 'm5', ticketId: 't2', sender: 'customer', senderName: 'Erika Müller', body: 'We are seeing SAP transaction failures every 20 minutes during peak hours. Finance team cannot process orders. This is a P1 incident.', sentAt: '2026-04-18T07:30:00Z' },
  { id: 'm6', ticketId: 't2', sender: 'agent', senderName: 'Marco Richter', body: 'Acknowledged. I have opened an emergency case with SAP support and our network team is analysing the connection pool traces now. Will update you hourly.', sentAt: '2026-04-18T08:15:00Z' },

  { id: 'm7', ticketId: 't6', sender: 'customer', senderName: 'Petra Fischer', body: 'All our CI/CD pipelines are completely blocked. No releases can go out. This affects five product teams and our Monday release window.', sentAt: '2026-04-19T04:00:00Z' },
  { id: 'm8', ticketId: 't6', sender: 'agent', senderName: 'Marco Richter', body: 'I have access to the agent VM. The .NET 8 runtime update broke the agent binary. I am rolling back the runtime version and restarting the agent service now.', sentAt: '2026-04-19T06:30:00Z' },
  { id: 'm9', ticketId: 't6', sender: 'customer', senderName: 'Petra Fischer', body: 'Pipelines are running again — thank you for the fast resolution. Can you document the workaround so we can apply it to the other datacentre?', sentAt: '2026-04-20T08:00:00Z' },

  { id: 'm10', ticketId: 't14', sender: 'customer', senderName: 'Wolfgang Klein', body: 'New starters are waiting 6 hours before they can access any cloud resources. This makes their first day completely unproductive. We need this fixed urgently.', sentAt: '2026-04-19T12:00:00Z' },
  { id: 'm11', ticketId: 't14', sender: 'agent', senderName: 'Lena Hoffmann', body: 'I have identified that the delta sync queue has grown to 47,000 objects. I am escalating to the AAD Connect team to clear the backlog and review the scheduling configuration.', sentAt: '2026-04-19T13:30:00Z' },
];
