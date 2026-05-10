import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AiContextProvider from './components/context/AiContextProvider.jsx'
import { AiContext } from './components/context/AiContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AiContextProvider >
    <App />
  </AiContextProvider>,
)
