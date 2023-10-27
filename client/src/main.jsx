import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import "./css/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Router>
      <ThemeProvider>
        <App />
        <ToastContainer/>

      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
