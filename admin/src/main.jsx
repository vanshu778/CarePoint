import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorsContextProvider from './context/DoctorsContext.jsx'
import AppContextProvider from './context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorsContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorsContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
  ,
)
