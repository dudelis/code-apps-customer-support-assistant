import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { RoleSwitcher } from './RoleSwitcher';
import { VersionTag } from '../shared/VersionTag';
import type { Role } from '../../types';

interface ShellBarProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const useStyles = makeStyles({
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    padding: '0 24px',
    background: 'rgba(13, 15, 20, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '100',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '20px',
    lineHeight: '1',
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
});

export function ShellBar({ role, onRoleChange }: ShellBarProps) {
  const styles = useStyles();
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.icon}>🎧</span>
        <Text size={400} className={styles.title}>Customer Support Assistant</Text>
        <VersionTag />
      </div>
      <div className={styles.right}>
        <RoleSwitcher role={role} onRoleChange={onRoleChange} />
      </div>
    </header>
  );
}
