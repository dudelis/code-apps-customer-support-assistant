import type { Customer } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Klaus Hoffmann',
    company: 'BMW Group',
    role: 'Head of IT Operations',
    email: 'k.hoffmann@bmwgroup.com',
    lastInteraction: '2026-04-17',
  },
  {
    id: 'cust-002',
    name: 'Ingrid Weber',
    company: 'BASF SE',
    role: 'Digital Transformation Lead',
    email: 'i.weber@basf.com',
    lastInteraction: '2026-04-16',
  },
  {
    id: 'cust-003',
    name: 'Hans Schreiber',
    company: 'Siemens AG',
    role: 'Enterprise Systems Manager',
    email: 'h.schreiber@siemens.com',
    lastInteraction: '2026-04-15',
  },
  {
    id: 'cust-004',
    name: 'Anna Fischer',
    company: 'Deutsche Bank',
    role: 'Compliance Technology Director',
    email: 'a.fischer@db.com',
    lastInteraction: '2026-04-16',
  },
  {
    id: 'cust-005',
    name: 'Lukas Braun',
    company: 'Allianz SE',
    role: 'Insurance Platform Architect',
    email: 'l.braun@allianz.com',
    lastInteraction: '2026-04-17',
  },
];
