import { Text } from '@fluentui/react-components';
import { mockTickets } from '../../data/mockTickets';
import type { TicketStatus } from '../../types';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';

interface KanbanViewProps {
  onSelectTicket: (id: string) => void;
}

const COLUMNS: TicketStatus[] = ['New', 'Open', 'Assigned', 'In Progress', 'Waiting', 'Closed'];

const columnAccent: Record<TicketStatus, string> = {
  New: '#6366f1',
  Open: '#f59e0b',
  Assigned: '#8b5cf6',
  'In Progress': '#f97316',
  Waiting: '#64748b',
  Closed: '#22c55e',
};

export function KanbanView({ onSelectTicket }: KanbanViewProps) {
  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        gap: 12,
        minWidth: 1200,
      }}>
        {COLUMNS.map(col => {
          const tickets = mockTickets.filter(t => t.status === col);
          return (
            <div key={col}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                paddingBottom: 10,
                borderBottom: `2px solid ${columnAccent[col]}`,
              }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{col}</Text>
                <div style={{
                  minWidth: 20, height: 20, borderRadius: 10,
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'var(--text-muted)', fontWeight: 600,
                }}>
                  {tickets.length}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tickets.map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => onSelectTicket(ticket.id)}
                    style={{
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 10,
                      padding: 12,
                      cursor: 'pointer',
                      transition: 'transform 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = columnAccent[col];
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    <Text style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{ticket.id}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', display: 'block', marginBottom: 10, lineHeight: '1.4' }}>
                      {ticket.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
                      {ticket.customer}
                    </Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <StatusBadge status={ticket.status} />
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </div>
                ))}
                {tickets.length === 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed var(--border-glass)',
                    borderRadius: 10,
                    padding: '20px 12px',
                    textAlign: 'center',
                  }}>
                    <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>No tickets</Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
