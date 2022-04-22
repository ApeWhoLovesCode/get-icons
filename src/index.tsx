import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pages from './pages';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>
);
