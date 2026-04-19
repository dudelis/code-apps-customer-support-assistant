import { Badge } from '@fluentui/react-components';
import type { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
}

const colorMap: Record<Priority, 'danger' | 'warning' | 'informative' | 'subtle'> = {
  Critical: 'danger',
  High: 'warning',
  Medium: 'informative',
  Low: 'subtle',
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge appearance="filled" color={colorMap[priority]} size="small">
      {priority}
    </Badge>
  );
}
