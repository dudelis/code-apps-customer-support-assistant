import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { TicketStatus } from '../../types';

interface StatusProgressionBarProps {
  currentStatus: TicketStatus;
}

const STEPS: TicketStatus[] = ['New', 'Open', 'Assigned', 'In Progress', 'Waiting', 'Closed'];

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  dot: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    flexShrink: '0',
  },
  dotActive: {
    background: '#4F8CFF',
    border: '1px solid #4F8CFF',
    boxShadow: '0 0 10px rgba(79,140,255,0.5)',
  },
  dotPast: {
    background: 'rgba(79,140,255,0.3)',
    border: '1px solid rgba(79,140,255,0.5)',
  },
  label: {
    color: tokens.colorNeutralForeground4,
    fontSize: '10px',
  },
  labelActive: {
    color: '#4F8CFF',
    fontWeight: tokens.fontWeightSemibold,
  },
  line: {
    flex: '1',
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    minWidth: '16px',
  },
  lineActive: {
    background: 'rgba(79,140,255,0.4)',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  dotInner: {
    fontSize: '10px',
    color: 'white',
  },
});

export function StatusProgressionBar({ currentStatus }: StatusProgressionBarProps) {
  const styles = useStyles();
  const currentIndex = STEPS.indexOf(currentStatus);

  return (
    <div className={styles.container}>
      {STEPS.map((step, i) => (
        <div key={step} className={styles.step} style={{ flex: i < STEPS.length - 1 ? '1 1 auto' : undefined }}>
          <div className={styles.stepContent}>
            <div className={[
              styles.dot,
              i < currentIndex ? styles.dotPast : '',
              i === currentIndex ? styles.dotActive : '',
            ].filter(Boolean).join(' ')}>
              {i <= currentIndex && <span className={styles.dotInner}>✓</span>}
            </div>
            <Text size={100} className={i === currentIndex ? styles.labelActive : styles.label}>{step}</Text>
          </div>
          {i < STEPS.length - 1 && (
            <div className={[styles.line, i < currentIndex ? styles.lineActive : ''].filter(Boolean).join(' ')} />
          )}
        </div>
      ))}
    </div>
  );
}
