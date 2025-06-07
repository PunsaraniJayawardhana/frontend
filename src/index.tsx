import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Ensure 'root' is non-null for TypeScript
const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("Root container not found. Make sure there is an element with id 'root' in your HTML.");
}
