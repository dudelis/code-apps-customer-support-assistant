import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { metrics } from '../../data/metrics';
import { GlassPanel } from '../shared/GlassPanel';

const useStyles = makeStyles({
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '24px',
    textAlign: 'center',
    borderRadius: '14px',
  },
  value: {
    color: tokens.colorNeutralForeground1,
    display: 'block',
  },
  label: {
    color: tokens.colorNeutralForeground3,
  },
  breach: {
    color: '#ef4444',
  },
  accent: {
    color: '#4F8CFF',
  },
  success: {
    color: '#10b981',
  },
});

export function MetricsStrip() {
  const styles = useStyles();
  return (
    <div className={styles.strip}>
      <GlassPanel className={styles.card}>
        <Text size={800} weight="bold" className={styles.value} style={{ fontSize: '36px' }}>{metrics.openTickets}</Text>
        <Text size={200} className={styles.label}>Open Tickets</Text>
      </GlassPanel>
      <GlassPanel className={styles.card}>
        <Text size={800} weight="bold" className={[styles.value, styles.breach].join(' ')} style={{ fontSize: '36px' }}>{metrics.slaBreaches}</Text>
        <Text size={200} className={styles.label}>SLA Breaches</Text>
      </GlassPanel>
      <GlassPanel className={styles.card}>
        <Text size={800} weight="bold" className={[styles.value, styles.accent].join(' ')} style={{ fontSize: '36px' }}>{metrics.avgResolutionHours}h</Text>
        <Text size={200} className={styles.label}>Avg Resolution Time</Text>
      </GlassPanel>
      <GlassPanel className={styles.card}>
        <Text size={800} weight="bold" className={[styles.value, styles.success].join(' ')} style={{ fontSize: '36px' }}>{metrics.resolvedThisWeek}</Text>
        <Text size={200} className={styles.label}>Resolved This Week</Text>
      </GlassPanel>
    </div>
  );
}
