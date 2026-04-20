import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { MetricsStrip } from './MetricsStrip';
import { ActiveTicketsStrip } from './ActiveTicketsStrip';
import { CriticalIssuesPanel } from './CriticalIssuesPanel';
import { InsightsPanel } from './InsightsPanel';

const useStyles = makeStyles({
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  greeting: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  welcome: {
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

export function ManagerDashboard() {
  const styles = useStyles();
  return (
    <div className={styles.dashboard}>
      <div className={styles.greeting}>
        <Text size={600} weight="bold" className={styles.welcome}>Welcome back, Darth.</Text>
        <Text size={300} className={styles.subtitle}>Here is your support operations overview for today.</Text>
      </div>
      <MetricsStrip />
      <ActiveTicketsStrip />
      <CriticalIssuesPanel />
      <div className={styles.section}>
        <Text size={400} weight="semibold">Insights</Text>
        <InsightsPanel />
      </div>
    </div>
  );
}
