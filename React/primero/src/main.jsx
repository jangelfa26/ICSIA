import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Dos from './Dos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Dos />
  </StrictMode>,
)
