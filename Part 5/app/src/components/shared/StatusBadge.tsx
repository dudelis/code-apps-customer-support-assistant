import { Badge } from '@fluentui/react-components';
import type { TicketStatus } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus;
}

const colorMap: Record<TicketStatus, 'success' | 'warning' | 'informative' | 'subtle' | 'danger'> = {
  New: 'informative',
  Open: 'warning',
  Assigned: 'informative',
  'In Progress': 'success',
  Waiting: 'subtle',
  Closed: 'subtle',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge color={colorMap[status]} appearance="tint" size="small">
      {status}
    </Badge>
  );
}
