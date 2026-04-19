import { useState } from 'react';
import {
  TabList,
  Tab,
  Button,
  Text,
} from '@fluentui/react-components';
import { DismissRegular, CopyRegular } from '@fluentui/react-icons';
import { mockTickets } from '../../data/mockTickets';
import { mockMessages } from '../../data/mockMessages';
import { mockCustomers } from '../../data/mockCustomers';
import { mockActivity } from '../../data/mockMetrics';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import type { TicketStatus } from '../../types';

interface TicketOverlayProps {
  ticketId: string;
  onClose: () => void;
}

const STATUS_STEPS: TicketStatus[] = ['New', 'Open', 'Assigned', 'In Progress', 'Waiting', 'Closed'];

function StatusBar({ current }: { current: TicketStatus }) {
  const currentIndex = STATUS_STEPS.indexOf(current);
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {STATUS_STEPS.map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: i === currentIndex ? 600 : 400,
            background: i < currentIndex
              ? 'rgba(99,102,241,0.4)'
              : i === currentIndex
              ? 'var(--accent)'
              : 'rgba(255,255,255,0.06)',
            color: i <= currentIndex ? '#fff' : 'var(--text-muted)',
            border: i === currentIndex ? '1px solid var(--accent)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}>
            {step}
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div style={{ width: 20, height: 1, background: i < currentIndex ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function TicketOverlay({ ticketId, onClose }: TicketOverlayProps) {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [copied, setCopied] = useState(false);

  const ticket = mockTickets.find(t => t.id === ticketId);
  if (!ticket) return null;

  const messages = mockMessages.filter(m => m.ticketId === ticketId);
  const customer = mockCustomers.find(c => c.id === ticket.customerId);
  const activity = mockActivity.filter(a => a.ticketId === ticketId);

  function handleCopy() {
    navigator.clipboard.writeText(ticket!.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 900,
        margin: '24px auto',
        background: '#13151c',
        borderRadius: 16,
        border: '1px solid var(--border-glass)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1d2e 0%, #1e1040 50%, #0f1729 100%)',
          padding: '28px 32px 24px',
          borderBottom: '1px solid var(--border-glass)',
          position: 'relative',
        }}>
          <Button
            appearance="subtle"
            icon={<DismissRegular />}
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, color: 'var(--text-muted)' }}
          />
          <div style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {ticket.id}
            </Text>
          </div>
          <Text as="h2" style={{ fontSize: 22, fontWeight: 700, color: '#fff', display: 'block', marginBottom: 16 }}>
            {ticket.title}
          </Text>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Customer</Text>
              <Text style={{ fontSize: 14, color: '#fff', display: 'block', fontWeight: 500 }}>{ticket.customer}</Text>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Status</Text>
              <div style={{ marginTop: 2 }}><StatusBadge status={ticket.status} /></div>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Priority</Text>
              <div style={{ marginTop: 2 }}><PriorityBadge priority={ticket.priority} /></div>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Assigned Agent</Text>
              <Text style={{ fontSize: 14, color: '#fff', display: 'block', fontWeight: 500 }}>{ticket.assignedAgent}</Text>
            </div>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Created</Text>
              <Text style={{ fontSize: 14, color: '#fff', display: 'block' }}>{ticket.createdDate}</Text>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 32px', borderBottom: '1px solid var(--border-glass)', background: '#13151c' }}>
          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, data) => setActiveTab(data.value as string)}
            appearance="subtle"
          >
            <Tab value="summary">Summary</Tab>
            <Tab value="activity">Activity</Tab>
            <Tab value="messages">Messages</Tab>
            <Tab value="customer">Customer Info</Tab>
          </TabList>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {activeTab === 'summary' && (
            <div>
              <div style={{
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>✦ AI Summary</span>
                </div>
                <Text style={{ fontSize: 15, lineHeight: '1.7', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  {ticket.summary}
                </Text>
              </div>
              <Button
                appearance="subtle"
                icon={<CopyRegular />}
                onClick={handleCopy}
                style={{ color: 'var(--text-muted)' }}
              >
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </Button>
            </div>
          )}

          {activeTab === 'activity' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {activity.length === 0 ? (
                <Text style={{ color: 'var(--text-muted)' }}>No activity recorded.</Text>
              ) : (
                activity.map((entry, i) => (
                  <div key={entry.id} style={{ display: 'flex', gap: 16, paddingBottom: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: 'var(--accent)', flexShrink: 0, marginTop: 4,
                      }} />
                      {i < activity.length - 1 && (
                        <div style={{ width: 1, flex: 1, background: 'var(--border-glass)', marginTop: 4 }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: 4 }}>
                      <Text style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{entry.action}</Text>
                      <br />
                      <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {entry.agent} · {formatTime(entry.timestamp)}
                      </Text>
                    </div>
                  </div>
                ))
              )}
              {activity.length === 0 && (
                <div style={{ display: 'flex', gap: 16, paddingBottom: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 4 }} />
                  </div>
                  <div>
                    <Text style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>Ticket created</Text>
                    <br />
                    <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>System · {ticket.createdDate}</Text>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.length === 0 ? (
                <Text style={{ color: 'var(--text-muted)' }}>No messages yet.</Text>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.isAgent ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      background: msg.isAgent ? 'rgba(99,102,241,0.2)' : 'var(--bg-glass)',
                      border: `1px solid ${msg.isAgent ? 'rgba(99,102,241,0.35)' : 'var(--border-glass)'}`,
                      borderRadius: msg.isAgent ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      padding: '12px 16px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 6 }}>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: msg.isAgent ? '#a5b4fc' : 'var(--text-muted)' }}>
                          {msg.sender}
                        </Text>
                        <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {msg.type === 'email' ? '✉' : '💬'} {formatTime(msg.timestamp)}
                        </Text>
                      </div>
                      <Text style={{ fontSize: 14, lineHeight: '1.6', color: 'var(--text-primary)' }}>
                        {msg.content}
                      </Text>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'customer' && customer && (
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: 12,
              padding: 24,
              maxWidth: 420,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 16,
              }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <Text style={{ fontSize: 20, fontWeight: 700, display: 'block', marginBottom: 4 }}>{customer.name}</Text>
              <Text style={{ fontSize: 14, color: 'var(--text-muted)', display: 'block', marginBottom: 20 }}>{customer.role} · {customer.company}</Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email</Text>
                  <Text style={{ fontSize: 14, display: 'block', color: 'var(--text-primary)' }}>{customer.email}</Text>
                </div>
                <div>
                  <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last Interaction</Text>
                  <Text style={{ fontSize: 14, display: 'block', color: 'var(--text-primary)' }}>{customer.lastInteraction}</Text>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          padding: '16px 32px',
          background: '#13151c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <StatusBar current={ticket.status} />
          <Button appearance="subtle" onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
}
