import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import NavBar from './barraNavegacion.jsx'
import Cards from './cartas.jsx'
import Formulario from './Formulario.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <Cards />
    <Formulario />
    <Footer />
  </StrictMode>,
)
