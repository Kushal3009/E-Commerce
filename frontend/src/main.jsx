// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new API
import App from './App';
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
