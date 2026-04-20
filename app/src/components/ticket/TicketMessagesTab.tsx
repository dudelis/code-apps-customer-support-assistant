import { makeStyles, tokens, Text, Avatar } from '@fluentui/react-components';
import { messages } from '../../data/messages';

interface TicketMessagesTabProps {
  ticketId: string;
}

const useStyles = makeStyles({
  thread: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bubble: {
    display: 'flex',
    gap: '12px',
    maxWidth: '80%',
  },
  bubbleAgent: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  body: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '12px 16px',
    flex: '1',
  },
  bodyAgent: {
    background: 'rgba(79,140,255,0.12)',
    border: '1px solid rgba(79,140,255,0.2)',
  },
  sender: {
    color: tokens.colorNeutralForeground3,
    marginBottom: '4px',
  },
  message: {
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.6',
  },
  time: {
    color: tokens.colorNeutralForeground4,
    marginTop: '6px',
  },
  empty: {
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
    padding: '40px 0',
  },
});

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export function TicketMessagesTab({ ticketId }: TicketMessagesTabProps) {
  const styles = useStyles();
  const thread = messages.filter(m => m.ticketId === ticketId);

  if (thread.length === 0) {
    return <Text size={300} className={styles.empty}>No messages for this ticket.</Text>;
  }

  return (
    <div className={styles.thread}>
      {thread.map(msg => (
        <div
          key={msg.id}
          className={[styles.bubble, msg.sender === 'agent' ? styles.bubbleAgent : ''].filter(Boolean).join(' ')}
        >
          <Avatar name={msg.senderName} size={32} color={msg.sender === 'agent' ? 'brand' : 'colorful'} />
          <div className={[styles.body, msg.sender === 'agent' ? styles.bodyAgent : ''].filter(Boolean).join(' ')}>
            <Text size={100} block className={styles.sender}>{msg.senderName}</Text>
            <Text size={300} className={styles.message}>{msg.body}</Text>
            <Text size={100} block className={styles.time}>{formatTime(msg.sentAt)}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
