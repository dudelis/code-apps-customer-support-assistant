import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { useGlassStyles } from '../../theme/glassStyles';
import type { ReactNode, CSSProperties } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  elevated?: boolean;
  className?: string;
  style?: CSSProperties;
}

const useStyles = makeStyles({
  base: {
    padding: '20px',
  },
});

export function GlassPanel({ children, elevated, className, style }: GlassPanelProps) {
  const glass = useGlassStyles();
  const styles = useStyles();
  return (
    <div
      className={mergeClasses(
        styles.base,
        elevated ? glass.panelElevated : glass.panel,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
