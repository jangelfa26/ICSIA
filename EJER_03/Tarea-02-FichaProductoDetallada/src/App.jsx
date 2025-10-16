import { useState } from 'react'
import GaleriaProductos from './components/GaleriaProductos';
import { productos } from './datos/Productos';
import './App.css'

function App() {

  return (
    <>
      <div>
        <h1>Catálogo de Productos</h1>
        <GaleriaProductos productos={productos} />
      </div>
    </>
  )
}

export default App
