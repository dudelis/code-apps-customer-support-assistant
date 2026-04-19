import { Text } from '@fluentui/react-components';
import { mockTickets } from '../../data/mockTickets';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';

interface TicketsViewProps {
  onSelectTicket: (id: string) => void;
}

export function TicketsView({ onSelectTicket }: TicketsViewProps) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 120px 100px 110px',
        padding: '10px 16px',
        borderBottom: '1px solid var(--border-glass)',
        marginBottom: 4,
      }}>
        {['Title', 'Customer', 'Status', 'Priority', 'Created'].map(col => (
          <Text key={col} style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {col}
          </Text>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {mockTickets.map(ticket => (
          <div
            key={ticket.id}
            onClick={() => onSelectTicket(ticket.id)}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 120px 100px 110px',
              padding: '12px 16px',
              borderRadius: 10,
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              cursor: 'pointer',
              alignItems: 'center',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-glass)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-glass)';
            }}
          >
            <div>
              <Text style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>{ticket.id}</Text>
              <Text style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{ticket.title}</Text>
            </div>
            <Text style={{ fontSize: 14, color: 'var(--text-primary)' }}>{ticket.customer}</Text>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            <Text style={{ fontSize: 13, color: 'var(--text-muted)' }}>{ticket.createdDate}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
