import { makeStyles, tokens } from '@fluentui/react-components';

export const useGlassStyles = makeStyles({
  panel: {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: tokens.shadow16,
  },
  panelElevated: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    boxShadow: tokens.shadow28,
  },
  gradientBanner: {
    background: 'linear-gradient(135deg, #1a2744 0%, #1e1b4b 50%, #0f172a 100%)',
    borderBottom: '1px solid rgba(79, 140, 255, 0.2)',
  },
  accentGlow: {
    boxShadow: '0 0 20px rgba(79, 140, 255, 0.15)',
  },
});
