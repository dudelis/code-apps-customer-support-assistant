import { makeStyles, tokens, mergeClasses, Text } from '@fluentui/react-components';
import type { AgentNavView } from '../../types';

interface AgentNavTabsProps {
  activeView: AgentNavView;
  onViewChange: (view: AgentNavView) => void;
}

const tabs: { id: AgentNavView; label: string; icon: string }[] = [
  { id: 'tickets', label: 'Tickets', icon: '📋' },
  { id: 'kanban', label: 'Kanban', icon: '📊' },
  { id: 'customers', label: 'Customers', icon: '👥' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
];

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
    transition: 'all 0.15s ease',
    ':hover': {
      background: 'rgba(255,255,255,0.06)',
      color: tokens.colorNeutralForeground1,
    },
  },
  activeTab: {
    background: 'linear-gradient(135deg, rgba(79,140,255,0.2) 0%, rgba(139,92,246,0.15) 100%)',
    color: '#4F8CFF',
    fontWeight: tokens.fontWeightSemibold,
    boxShadow: '0 0 16px rgba(79,140,255,0.15)',
  },
  icon: {
    fontSize: '14px',
  },
});

export function AgentNavTabs({ activeView, onViewChange }: AgentNavTabsProps) {
  const styles = useStyles();
  return (
    <nav className={styles.nav}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={mergeClasses(styles.tab, activeView === tab.id ? styles.activeTab : undefined)}
          onClick={() => onViewChange(tab.id)}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <Text size={300}>{tab.label}</Text>
        </button>
      ))}
    </nav>
  );
}
