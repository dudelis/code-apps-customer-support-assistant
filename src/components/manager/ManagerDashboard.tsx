import { Text } from '@fluentui/react-components';
import { mockMetrics } from '../../data/mockMetrics';
import { mockTickets } from '../../data/mockTickets';
import { PriorityBadge } from '../shared/PriorityBadge';
import { StatusBadge } from '../shared/StatusBadge';

interface ManagerDashboardProps {
  onSelectTicket: (id: string) => void;
}

const insights = [
  'Critical ticket volume is up 40% this week — BMW SSO and ERP issues are driving escalations.',
  'Average resolution time improved to 6.2 hours, down from 8.4 hours last month.',
  'SLA breach risk is concentrated in the "Waiting" status — 3 tickets approaching deadline.',
];

export function ManagerDashboard({ onSelectTicket }: ManagerDashboardProps) {
  const activeTickets = mockTickets.filter(t => t.status !== 'Closed').slice(0, 6);
  const criticalTickets = mockTickets
    .filter(t => t.priority === 'Critical' || (t.priority === 'High' && t.status !== 'Closed'))
    .slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting */}
      <div>
        <Text style={{ fontSize: 24, fontWeight: 700, display: 'block', marginBottom: 4 }}>
          Welcome back 👋
        </Text>
        <Text style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Here is your support overview for today, 19 April 2026
        </Text>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <MetricCard
          label="Open Tickets"
          value={String(mockMetrics.openTickets)}
          sub="across all priorities"
          accent="#6366f1"
          icon="🎫"
        />
        <MetricCard
          label="SLA Breaches"
          value={String(mockMetrics.slaBreaches)}
          sub="tickets at risk today"
          accent="#ef4444"
          icon="⚠️"
        />
        <MetricCard
          label="Avg Resolution"
          value={`${mockMetrics.avgResolutionHours}h`}
          sub="↓ 2.2h vs last month"
          accent="#22c55e"
          icon="⏱"
        />
      </div>

      {/* Active Tickets */}
      <div>
        <Text style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 12 }}>Active Tickets</Text>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 14, minWidth: 'max-content' }}>
            {activeTickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                style={{
                  width: 240,
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 12,
                  padding: 16,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'transform 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-2px)';
                  el.style.borderColor = 'rgba(99,102,241,0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'var(--border-glass)';
                }}
              >
                <Text style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>{ticket.id}</Text>
                <Text style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 10, lineHeight: '1.4', color: 'var(--text-primary)' }}>
                  {ticket.title}
                </Text>
                <Text style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>{ticket.customer}</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Issues + Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Critical Issues */}
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-glass)',
          borderRadius: 14,
          padding: 20,
        }}>
          <Text style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 14, color: 'var(--text-primary)' }}>
            🔥 Critical Issues
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {criticalTickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: 'var(--bg-glass)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <Text style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>{ticket.id} · {ticket.customer}</Text>
                  <Text style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{ticket.title}</Text>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 14,
          padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600 }}>✦ AI Insights</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {insights.map((insight, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent)', marginTop: 6, flexShrink: 0,
                }} />
                <Text style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic' }}>
                  {insight}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  accent: string;
  icon: string;
}

function MetricCard({ label, value, sub, accent, icon }: MetricCardProps) {
  return (
    <div style={{
      background: 'var(--bg-glass)',
      border: `1px solid ${accent}30`,
      borderRadius: 14,
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -20, right: -10,
        fontSize: 60, opacity: 0.06, userSelect: 'none',
      }}>
        {icon}
      </div>
      <Text style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 36, fontWeight: 700, display: 'block', marginBottom: 4, color: accent }}>
        {value}
      </Text>
      <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</Text>
    </div>
  );
}
