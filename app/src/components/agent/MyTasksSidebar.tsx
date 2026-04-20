import { useState } from 'react';
import { makeStyles, tokens, Text, Checkbox, Select } from '@fluentui/react-components';
import { useTasks } from '../../hooks/useTasks';
import { PriorityBadge } from '../shared/PriorityBadge';
import { GlassPanel } from '../shared/GlassPanel';
import { useTicketOverlay } from '../../hooks/useTicketOverlay';

type SortBy = 'date' | 'priority';

const useStyles = makeStyles({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    height: '100%',
    padding: '0',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  list: {
    flex: '1',
    overflowY: 'auto',
    padding: '8px 0',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    transition: 'background 0.1s ease',
    ':hover': {
      background: 'rgba(79,140,255,0.06)',
    },
  },
  itemTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemTitle: {
    flex: '1',
    color: tokens.colorNeutralForeground2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  itemDone: {
    textDecoration: 'line-through',
    color: tokens.colorNeutralForeground4,
  },
  dueDate: {
    color: tokens.colorNeutralForeground4,
    paddingLeft: '28px',
  },
});

export function MyTasksSidebar() {
  const styles = useStyles();
  const { sortByDate, sortByPriority } = useTasks();
  const { openOverlay } = useTicketOverlay();
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [done, setDone] = useState<Set<string>>(new Set());

  const tasks = sortBy === 'date' ? sortByDate() : sortByPriority();

  const toggleDone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDone(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <GlassPanel className={styles.sidebar}>
      <div className={styles.header}>
        <Text size={300} weight="semibold">My Tasks</Text>
        <Select
          size="small"
          value={sortBy}
          onChange={(_, d) => setSortBy(d.value as SortBy)}
          style={{ background: 'transparent', border: 'none' }}
        >
          <option value="date">By Date</option>
          <option value="priority">By Priority</option>
        </Select>
      </div>
      <div className={styles.list}>
        {tasks.map(task => {
          const isDone = done.has(task.id) || task.done;
          return (
            <div
              key={task.id}
              className={styles.item}
              onClick={() => task.ticketId && openOverlay(task.ticketId)}
            >
              <div className={styles.itemTop}>
                <Checkbox
                  checked={isDone}
                  onClick={(e) => toggleDone(task.id, e)}
                  onChange={() => {}}
                />
                <Text
                  size={200}
                  className={isDone ? styles.itemDone : styles.itemTitle}
                >
                  {task.title}
                </Text>
                <PriorityBadge priority={task.priority} />
              </div>
              <Text size={100} className={styles.dueDate}>Due {task.dueDate}</Text>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
