import { useState, useEffect } from 'react';
import { makeStyles, tokens, Text, Button, Spinner } from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';
import type { OverlayTab } from '../../types';
import { TicketOverlayHeader } from './TicketOverlayHeader';
import { TicketSummaryTab } from './TicketSummaryTab';
import { TicketActivityTab } from './TicketActivityTab';
import { TicketMessagesTab } from './TicketMessagesTab';
import { TicketCustomerInfoTab } from './TicketCustomerInfoTab';
import { StatusProgressionBar } from './StatusProgressionBar';
import { sendNotification, invokeTicketEmail } from '../../services/flows';

const EMAIL_BANNER_DURATION_MS = 5000;

const TABS: { id: OverlayTab; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'activity', label: 'Activity' },
  { id: 'messages', label: 'Messages' },
  { id: 'customer', label: 'Customer Info' },
];

const useStyles = makeStyles({
  backdrop: {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: '200',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  overlay: {
    width: '100%',
    maxWidth: '860px',
    background: '#0d0f14',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideIn 0.2s ease',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '12px 32px 0',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  tab: {
    padding: '8px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
    transition: 'all 0.15s ease',
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    color: '#4F8CFF',
    borderBottomColor: '#4F8CFF',
    fontWeight: tokens.fontWeightSemibold,
  },
  content: {
    flex: '1',
    overflowY: 'auto',
    padding: '24px 32px',
  },
  footer: {
    padding: '16px 32px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingWrapper: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '10px 32px',
    background: 'rgba(34, 197, 94, 0.12)',
    borderBottom: '1px solid rgba(34, 197, 94, 0.3)',
    color: '#4ade80',
  },
  bannerMessage: {
    flex: '1',
  },
  bannerDismiss: {
    flexShrink: '0',
    minWidth: 'unset',
    padding: '0 6px',
    color: '#4ade80',
    opacity: '0.7',
    ':hover': { opacity: '1' },
  },
});

export function TicketOverlay() {
  const styles = useStyles();
  const { isOpen, ticketId, activeTab, setTab, closeOverlay } = useTicketOverlay();
  const { all, isLoading, updateStatus, deleteTicket } = useTickets();
  const [flowMessage, setFlowMessage] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isHttpTriggering, setIsHttpTriggering] = useState(false);

  useEffect(() => {
    if (!flowMessage) return;
    const timer = setTimeout(() => setFlowMessage(null), EMAIL_BANNER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [flowMessage]);

  if (!isOpen || !ticketId) return null;

  const ticket = all.find(t => t.id === ticketId);

  const handleDelete = async () => {
    if (!ticket) return;
    await deleteTicket(ticket.id);
    closeOverlay();
  };

  const handleSendEmail = async () => {
    if (!ticket) return;
    setIsSendingEmail(true);
    try {
      const result = await sendNotification({ text: ticket.id });
      setFlowMessage(result.message || 'Email sent successfully.');
    } catch (err) {
      setFlowMessage(err instanceof Error ? err.message : 'Failed to send email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleHttpTrigger = async () => {
    if (!ticket) return;
    setIsHttpTriggering(true);
    try {
      const result = await invokeTicketEmail(ticket.id);
      setFlowMessage(result.message || 'HTTP trigger sent successfully.');
    } catch (err) {
      setFlowMessage(err instanceof Error ? err.message : 'HTTP trigger failed.');
    } finally {
      setIsHttpTriggering(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={closeOverlay}>
      <div className={styles.overlay} onClick={e => e.stopPropagation()}>
        {isLoading || !ticket ? (
          <div className={styles.loadingWrapper}>
            <Spinner label="Loading ticket…" />
          </div>
        ) : (
          <>
            <TicketOverlayHeader ticket={ticket} />
            <div className={styles.tabs}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={[styles.tab, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
                  onClick={() => setTab(tab.id)}
                >
                  <Text size={300}>{tab.label}</Text>
                </button>
              ))}
            </div>
            {flowMessage && (
              <div className={styles.banner}>
                <Text size={300} className={styles.bannerMessage}>{flowMessage}</Text>
                <Button
                  appearance="transparent"
                  size="small"
                  className={styles.bannerDismiss}
                  onClick={() => setFlowMessage(null)}
                >
                  ✕
                </Button>
              </div>
            )}
            <div className={styles.content}>
              {activeTab === 'summary' && <TicketSummaryTab ticket={ticket} />}
              {activeTab === 'activity' && <TicketActivityTab ticketId={ticket.id} />}
              {activeTab === 'messages' && <TicketMessagesTab ticketId={ticket.id} />}
              {activeTab === 'customer' && <TicketCustomerInfoTab ticket={ticket} />}
            </div>
            <div className={styles.footer}>
              <StatusProgressionBar
                currentStatus={ticket.status}
                onStatusChange={(status) => updateStatus(ticket.id, status)}
              />
              <div className={styles.footerActions}>
                <Button appearance="subtle" onClick={closeOverlay}>← Back</Button>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Button
                    appearance="primary"
                    disabled={isSendingEmail}
                    icon={isSendingEmail ? <Spinner size="tiny" /> : undefined}
                    onClick={handleSendEmail}
                  >
                    {isSendingEmail ? 'Sending…' : 'Send Email'}
                  </Button>
                  <Button
                    appearance="secondary"
                    disabled={isHttpTriggering}
                    icon={isHttpTriggering ? <Spinner size="tiny" /> : undefined}
                    onClick={handleHttpTrigger}
                  >
                    {isHttpTriggering ? 'Triggering…' : 'HTTP Trigger'}
                  </Button>
                  <Button
                    appearance="outline"
                    style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)' }}
                    onClick={handleDelete}
                  >
                    Delete Ticket
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
