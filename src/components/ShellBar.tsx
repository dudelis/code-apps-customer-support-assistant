import { ToggleButton, Text } from '@fluentui/react-components';
import type { Role } from '../types';

interface ShellBarProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

export function ShellBar({ role, onRoleChange }: ShellBarProps) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      height: 56,
      background: 'rgba(13,15,20,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>🎧</span>
        <Text style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Customer Support Assistant
        </Text>
        <Text style={{ fontSize: 11, color: 'var(--text-muted)', opacity: 0.6 }}>v1.2.3</Text>
      </div>

      {/* Role switcher */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border-glass)',
        borderRadius: 8,
        padding: 3,
        gap: 2,
      }}>
        <ToggleButton
          checked={role === 'agent'}
          onClick={() => onRoleChange('agent')}
          appearance="subtle"
          size="small"
          style={{
            borderRadius: 6,
            fontSize: 13,
            padding: '4px 14px',
            background: role === 'agent' ? 'var(--accent)' : 'transparent',
            color: role === 'agent' ? '#fff' : 'var(--text-muted)',
            border: 'none',
            fontWeight: role === 'agent' ? 600 : 400,
            transition: 'all 0.15s',
          }}
        >
          Support Agent
        </ToggleButton>
        <ToggleButton
          checked={role === 'manager'}
          onClick={() => onRoleChange('manager')}
          appearance="subtle"
          size="small"
          style={{
            borderRadius: 6,
            fontSize: 13,
            padding: '4px 14px',
            background: role === 'manager' ? 'var(--accent)' : 'transparent',
            color: role === 'manager' ? '#fff' : 'var(--text-muted)',
            border: 'none',
            fontWeight: role === 'manager' ? 600 : 400,
            transition: 'all 0.15s',
          }}
        >
          Manager
        </ToggleButton>
        <ToggleButton
          checked={role === 'flow'}
          onClick={() => onRoleChange('flow')}
          appearance="subtle"
          size="small"
          style={{
            borderRadius: 6,
            fontSize: 13,
            padding: '4px 14px',
            background: role === 'flow' ? 'var(--accent)' : 'transparent',
            color: role === 'flow' ? '#fff' : 'var(--text-muted)',
            border: 'none',
            fontWeight: role === 'flow' ? 600 : 400,
            transition: 'all 0.15s',
          }}
        >
          Flow
        </ToggleButton>
      </div>
    </header>
  );
}
