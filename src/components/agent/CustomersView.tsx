import { useState } from 'react';
import { Button, Text } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { mockCustomers } from '../../data/mockCustomers';
import { mockTickets } from '../../data/mockTickets';
import type { Customer } from '../../types';
import { CustomerCard } from './CustomerCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PriorityBadge } from '../shared/PriorityBadge';

interface CustomersViewProps {
  onSelectTicket: (id: string) => void;
}

export function CustomersView({ onSelectTicket }: CustomersViewProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  function handleViewDetails(customer: Customer) {
    setSelectedCustomer(customer);
  }

  const customerTickets = selectedCustomer
    ? mockTickets.filter(t => t.customerId === selectedCustomer.id)
    : [];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {mockCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedCustomer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 900,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#13151c',
            border: '1px solid var(--border-glass)',
            borderRadius: 16,
            padding: 32,
            width: 520,
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, color: '#fff',
                }}>
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <Text style={{ fontSize: 20, fontWeight: 700, display: 'block' }}>{selectedCustomer.name}</Text>
                  <Text style={{ color: 'var(--text-muted)' }}>{selectedCustomer.role} · {selectedCustomer.company}</Text>
                </div>
              </div>
              <Button appearance="subtle" icon={<DismissRegular />} onClick={() => setSelectedCustomer(null)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                ['Email', selectedCustomer.email],
                ['Company', selectedCustomer.company],
                ['Last Interaction', selectedCustomer.lastInteraction],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 8 }}>
                  <Text style={{ fontSize: 13, color: 'var(--text-muted)', width: 130, flexShrink: 0 }}>{label}</Text>
                  <Text style={{ fontSize: 13, color: 'var(--text-primary)' }}>{value}</Text>
                </div>
              ))}
            </div>

            <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 12 }}>
              Recent Tickets
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {customerTickets.map(ticket => (
                <div
                  key={ticket.id}
                  onClick={() => {
                    setSelectedCustomer(null);
                    onSelectTicket(ticket.id);
                  }}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>{ticket.id}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 500 }}>{ticket.title}</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <StatusBadge status={ticket.status} />
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
