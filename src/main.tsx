import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';

// На GitHub Pages сайт лежит в подпапке /movie-catalog-react/. Vite кладёт этот
// путь в BASE_URL из настройки base, а роутер должен знать его как basename.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
