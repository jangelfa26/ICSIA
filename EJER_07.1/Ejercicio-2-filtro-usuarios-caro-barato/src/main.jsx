import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import App from './sinOptimizar/App.jsx'
import App from './optimizado/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
