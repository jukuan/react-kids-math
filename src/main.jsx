import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import './styles.css';

const UPDATE_INTERVAL_MS = 3 * 60 * 60 * 1000; // every 3 hours

registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      setInterval(() => {
        r.update();
      }, UPDATE_INTERVAL_MS);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
