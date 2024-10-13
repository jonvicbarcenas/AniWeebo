import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GlobalContextProvider } from './context/global';
import App from './components/App.jsx'
import { ToastProvider } from './context/ToastContext';
import { AuthContextProvider } from './context/authContext';
import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.serverURL = 'http://localhost:5000';
axios.defaults.serverURL = 'https://aniweebserverdb-production.up.railway.app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <AuthContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  </StrictMode>,
)