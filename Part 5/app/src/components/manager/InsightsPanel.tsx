import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { GlassPanel } from '../shared/GlassPanel';

const insights = [
  { id: 'i1', title: 'SLA risk increasing', body: '3 tickets are within 2 hours of breaching SLA. Exchange hybrid (BMW) and Azure AD sync (Deutsche Bank) should be prioritised. Consider reassigning if current agents are blocked.' },
  { id: 'i2', title: 'Recurring theme: certificate issues', body: '2 of this week\'s critical tickets are related to expired or misconfigured certificates. A proactive certificate renewal audit across tenant connectors is recommended.' },
  { id: 'i3', title: 'High ticket volume from Siemens', body: 'Siemens accounts represent 22% of open tickets this week. Consider scheduling a proactive check-in call to address systemic issues before new tickets are raised.' },
];

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  aiLabel: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, rgba(79,140,255,0.2), rgba(139,92,246,0.2))',
    border: '1px solid rgba(79,140,255,0.3)',
    borderRadius: '4px',
    padding: '1px 8px',
    color: '#4F8CFF',
    marginBottom: '4px',
    fontSize: '10px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
  },
  body: {
    color: tokens.colorNeutralForeground3,
    lineHeight: '1.6',
  },
});

export function InsightsPanel() {
  const styles = useStyles();
  return (
    <div className={styles.grid}>
      {insights.map(insight => (
        <GlassPanel key={insight.id} className={styles.card}>
          <span className={styles.aiLabel}>AI Insight</span>
          <Text size={300} weight="semibold" className={styles.title}>{insight.title}</Text>
          <Text size={200} className={styles.body}>{insight.body}</Text>
        </GlassPanel>
      ))}
    </div>
  );
}
