// src/main.jsx (หรือ src/main.tsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// ถ้ามีบรรทัดนี้: import './index.css'; ให้ลองคอมเมนต์ทิ้งไปก่อน (#)
// import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);