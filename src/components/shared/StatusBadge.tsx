import { Badge } from '@fluentui/react-components';
import type { TicketStatus } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus;
}

const colorMap: Record<TicketStatus, 'danger' | 'warning' | 'informative' | 'success' | 'subtle' | 'important'> = {
  New: 'informative',
  Open: 'warning',
  Assigned: 'important',
  'In Progress': 'warning',
  Waiting: 'subtle',
  Closed: 'success',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge appearance="tint" color={colorMap[status]} size="small">
      {status}
    </Badge>
  );
}
