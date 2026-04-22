import { makeStyles, tokens, mergeClasses } from '@fluentui/react-components';
import type { Role } from '../../types';

interface RoleSwitcherProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '3px',
    gap: '2px',
  },
  option: {
    padding: '4px 14px',
    borderRadius: '6px',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground3,
    border: 'none',
    background: 'transparent',
    transition: 'all 0.15s ease',
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
  },
  active: {
    background: 'rgba(79, 140, 255, 0.2)',
    color: '#4F8CFF',
    boxShadow: '0 0 12px rgba(79, 140, 255, 0.15)',
  },
});

export function RoleSwitcher({ role, onRoleChange }: RoleSwitcherProps) {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <button
        className={mergeClasses(styles.option, role === 'agent' ? styles.active : undefined)}
        onClick={() => onRoleChange('agent')}
      >
        Support Agent
      </button>
      <button
        className={mergeClasses(styles.option, role === 'manager' ? styles.active : undefined)}
        onClick={() => onRoleChange('manager')}
      >
        Manager
      </button>
    </div>
  );
}
