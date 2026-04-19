import { Checkbox, Text, Select } from '@fluentui/react-components';
import type { Task } from '../../types';
import { PriorityBadge } from '../shared/PriorityBadge';

interface TasksSidebarProps {
  tasks: Task[];
  taskSortBy: 'date' | 'priority';
  setTaskSortBy: (sort: 'date' | 'priority') => void;
  toggleTask: (id: string) => void;
  onSelectTicket: (id: string) => void;
}

const PRIORITY_ORDER: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export function TasksSidebar({ tasks, taskSortBy, setTaskSortBy, toggleTask, onSelectTicket }: TasksSidebarProps) {
  const sorted = [...tasks].sort((a, b) => {
    if (taskSortBy === 'priority') {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const pending = sorted.filter(t => !t.completed);
  const done = sorted.filter(t => t.completed);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-glass)',
      }}>
        <Text style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>My Tasks</Text>
        <Select
          size="small"
          value={taskSortBy}
          onChange={(_, data) => setTaskSortBy(data.value as 'date' | 'priority')}
          style={{ background: 'transparent', border: '1px solid var(--border-glass)', borderRadius: 6, color: 'var(--text-muted)', fontSize: 12 }}
        >
          <option value="date">Sort: Date</option>
          <option value="priority">Sort: Priority</option>
        </Select>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {pending.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onOpen={onSelectTicket} />
        ))}

        {done.length > 0 && (
          <>
            <Text style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 12, marginBottom: 4 }}>
              Completed
            </Text>
            {done.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onOpen={onSelectTicket} />
            ))}
          </>
        )}
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-glass)' }}>
        <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {pending.length} pending · {done.length} done
        </Text>
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onOpen: (ticketId: string) => void;
}

function TaskItem({ task, onToggle, onOpen }: TaskItemProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      padding: '10px 12px',
      borderRadius: 10,
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-glass)',
      cursor: 'pointer',
      opacity: task.completed ? 0.55 : 1,
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.09)'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-glass)'}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ marginTop: 1, flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      />
      <div style={{ flex: 1, minWidth: 0 }} onClick={() => onOpen(task.ticketId)}>
        <Text style={{
          fontSize: 13,
          fontWeight: 500,
          display: 'block',
          color: 'var(--text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          marginBottom: 4,
          lineHeight: '1.4',
        }}>
          {task.title}
        </Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PriorityBadge priority={task.priority} />
          <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>{task.dueDate}</Text>
        </div>
      </div>
    </div>
  );
}
