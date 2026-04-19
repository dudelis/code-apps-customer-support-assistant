import type { Message } from '../types';

export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    ticketId: 'TKT-001',
    sender: 'Klaus Hoffmann',
    content:
      'The nightly batch job failed again at 02:03 AM. Attached are the latest error logs. This is impacting our morning reporting cycle significantly.',
    timestamp: '2026-04-14T02:15:00Z',
    type: 'email',
    isAgent: false,
  },
  {
    id: 'msg-002',
    ticketId: 'TKT-001',
    sender: 'Sara Müller',
    content:
      'Thank you for the logs, Klaus. I have escalated this to our infrastructure team. We are investigating the timeout in the sync pipeline. I will provide an update by 10:00 AM.',
    timestamp: '2026-04-14T08:30:00Z',
    type: 'email',
    isAgent: true,
  },
  {
    id: 'msg-003',
    ticketId: 'TKT-001',
    sender: 'Klaus Hoffmann',
    content:
      'Understood. Please prioritise this — we have a board reporting deadline tomorrow morning.',
    timestamp: '2026-04-14T08:45:00Z',
    type: 'email',
    isAgent: false,
  },
  {
    id: 'msg-004',
    ticketId: 'TKT-001',
    sender: 'Sara Müller',
    content:
      'The root cause has been identified: the sync scheduler timeout was set to 30 seconds after the firmware update, down from 120 seconds. We are deploying the configuration fix now. ETA: 30 minutes.',
    timestamp: '2026-04-14T11:00:00Z',
    type: 'email',
    isAgent: true,
  },
  {
    id: 'msg-005',
    ticketId: 'TKT-002',
    sender: 'Ingrid Weber',
    content:
      'Three of our regional managers cannot access the analytics dashboard since this morning. They see a blank screen. Browser console shows 403 Forbidden.',
    timestamp: '2026-04-15T09:00:00Z',
    type: 'email',
    isAgent: false,
  },
  {
    id: 'msg-006',
    ticketId: 'TKT-002',
    sender: 'Max Becker',
    content:
      'Hi Ingrid, I can reproduce the issue. It appears the latest role update removed the "Analytics Viewer" permission from the Regional Manager role. I am preparing a patch.',
    timestamp: '2026-04-15T10:30:00Z',
    type: 'email',
    isAgent: true,
  },
  {
    id: 'msg-007',
    ticketId: 'TKT-003',
    sender: 'Hans Schreiber',
    content:
      'Roughly 40 of our employees cannot receive MFA tokens via the authenticator app. They are all on Android 14. Is there a known compatibility issue?',
    timestamp: '2026-04-15T11:00:00Z',
    type: 'chat',
    isAgent: false,
  },
  {
    id: 'msg-008',
    ticketId: 'TKT-003',
    sender: 'Sara Müller',
    content:
      'We are aware of the Android 14 issue and are working with the authenticator vendor. As a temporary workaround, users can enable SMS fallback in their account settings.',
    timestamp: '2026-04-15T11:15:00Z',
    type: 'chat',
    isAgent: true,
  },
  {
    id: 'msg-009',
    ticketId: 'TKT-006',
    sender: 'Klaus Hoffmann',
    content:
      'Since the AD migration last Friday, SSO is completely broken for around 200 users. They get an error page after entering their credentials. This is urgent.',
    timestamp: '2026-04-13T08:00:00Z',
    type: 'email',
    isAgent: false,
  },
  {
    id: 'msg-010',
    ticketId: 'TKT-006',
    sender: 'Sara Müller',
    content:
      'This is our top priority, Klaus. I have engaged our IAM specialist. The SAML token issuer likely needs to point to your new AD tenant. Can you share the new tenant ID from your AD admin?',
    timestamp: '2026-04-13T08:45:00Z',
    type: 'email',
    isAgent: true,
  },
];
