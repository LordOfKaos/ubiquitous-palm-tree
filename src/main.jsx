import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
