import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider } from '@fluentui/react-components';
import { customDarkTheme } from './theme/customDarkTheme';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider theme={customDarkTheme}>
      <App />
    </FluentProvider>
  </StrictMode>,
);
