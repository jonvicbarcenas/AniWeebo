import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './useStatePrac/index.jsx'
import './index.css'
import { GlobalContextProvider } from './context/global';
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
      {/* <Index /> */}
    </GlobalContextProvider>
  </StrictMode>,
)