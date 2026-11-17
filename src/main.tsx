import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { applyThemeCssVariables, theme } from './config/theme';
import './index.css';

applyThemeCssVariables(theme);

createRoot(document.getElementById('root')!).render(<App />);
