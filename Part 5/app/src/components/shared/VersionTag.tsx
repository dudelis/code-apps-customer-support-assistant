import { Badge } from '@fluentui/react-components';
import { APP_VERSION } from '../../version';

export function VersionTag() {
  return (
    <Badge color="subtle" appearance="ghost" size="small">
      v{APP_VERSION}
    </Badge>
  );
}
