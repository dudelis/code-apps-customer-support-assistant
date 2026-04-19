import { Button, Text } from '@fluentui/react-components';
import type { Customer } from '../../types';

interface CustomerCardProps {
  customer: Customer;
  onViewDetails: (customer: Customer) => void;
}

export function CustomerCard({ customer, onViewDetails }: CustomerCardProps) {
  const initials = customer.name.split(' ').map(n => n[0]).join('');

  return (
    <div style={{
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-glass)',
      borderRadius: 14,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-3px)';
        el.style.borderColor = 'rgba(99,102,241,0.4)';
        el.style.boxShadow = '0 12px 40px rgba(99,102,241,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'var(--border-glass)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <Text style={{ fontSize: 15, fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>{customer.name}</Text>
          <Text style={{ fontSize: 13, color: 'var(--text-muted)' }}>{customer.company}</Text>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <Text style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</Text>
          <Text style={{ fontSize: 13, color: 'var(--text-primary)', display: 'block' }}>{customer.role}</Text>
        </div>
        <div>
          <Text style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</Text>
          <Text style={{ fontSize: 13, color: 'var(--text-primary)', display: 'block' }}>{customer.email}</Text>
        </div>
        <div>
          <Text style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Last Interaction</Text>
          <Text style={{ fontSize: 13, color: 'var(--text-primary)', display: 'block' }}>{customer.lastInteraction}</Text>
        </div>
      </div>

      <Button
        appearance="outline"
        size="small"
        onClick={() => onViewDetails(customer)}
        style={{ marginTop: 4, borderColor: 'rgba(99,102,241,0.4)', color: '#a5b4fc' }}
      >
        View Details →
      </Button>
    </div>
  );
}
