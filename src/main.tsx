import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initThemeOnDocument } from './lib/initTheme';
import './styles/global.scss';

initThemeOnDocument();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element #root not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
