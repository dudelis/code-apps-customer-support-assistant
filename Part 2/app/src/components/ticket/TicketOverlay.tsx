import { makeStyles, tokens, Text, Button } from '@fluentui/react-components';
import { tickets } from '../../data/tickets';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';
import type { OverlayTab } from '../../types';
import { TicketOverlayHeader } from './TicketOverlayHeader';
import { TicketSummaryTab } from './TicketSummaryTab';
import { TicketActivityTab } from './TicketActivityTab';
import { TicketMessagesTab } from './TicketMessagesTab';
import { TicketCustomerInfoTab } from './TicketCustomerInfoTab';
import { StatusProgressionBar } from './StatusProgressionBar';

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
});

export function TicketOverlay() {
  const styles = useStyles();
  const { isOpen, ticketId, activeTab, setTab, closeOverlay } = useTicketOverlay();

  if (!isOpen || !ticketId) return null;

  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return null;

  return (
    <div className={styles.backdrop} onClick={closeOverlay}>
      <div className={styles.overlay} onClick={e => e.stopPropagation()}>
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
        <div className={styles.content}>
          {activeTab === 'summary' && <TicketSummaryTab ticket={ticket} />}
          {activeTab === 'activity' && <TicketActivityTab ticketId={ticket.id} />}
          {activeTab === 'messages' && <TicketMessagesTab ticketId={ticket.id} />}
          {activeTab === 'customer' && <TicketCustomerInfoTab ticket={ticket} />}
        </div>
        <div className={styles.footer}>
          <StatusProgressionBar currentStatus={ticket.status} />
          <div className={styles.footerActions}>
            <Button appearance="subtle" onClick={closeOverlay}>← Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
