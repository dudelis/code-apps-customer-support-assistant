import { makeStyles, tokens, Text, Button, MessageBar, MessageBarBody } from '@fluentui/react-components';
import type { Ticket } from '../../types';
import { GlassPanel } from '../shared/GlassPanel';

interface TicketSummaryTabProps {
  ticket: Ticket;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  aiLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  tag: {
    background: 'linear-gradient(135deg, rgba(79,140,255,0.2), rgba(139,92,246,0.2))',
    border: '1px solid rgba(79,140,255,0.3)',
    borderRadius: '6px',
    padding: '2px 10px',
    color: '#4F8CFF',
  },
  summary: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.7',
  },
  copyBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
});

export function TicketSummaryTab({ ticket }: TicketSummaryTabProps) {
  const styles = useStyles();

  const handleCopy = () => {
    navigator.clipboard.writeText(ticket.summary);
  };

  return (
    <div className={styles.container}>
      <MessageBar intent="info">
        <MessageBarBody>This summary is AI-generated from ticket history. Verify details before sharing.</MessageBarBody>
      </MessageBar>
      <GlassPanel>
        <div className={styles.aiLabel}>
          <Text size={100} className={styles.tag}>AI Summary</Text>
        </div>
        <Text size={300} className={styles.summary}>{ticket.summary}</Text>
        <div className={styles.copyBar}>
          <Button size="small" appearance="subtle" onClick={handleCopy}>Copy</Button>
        </div>
      </GlassPanel>
    </div>
  );
}
