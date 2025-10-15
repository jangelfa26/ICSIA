import { useState } from 'react'
import { productos } from "./datos/Productos";
import { FichaProducto } from "./components/FichaProducto";
import "./App.css";

function App() {
  
  return (
    <>
      <div className="galeria">
        {productos.map((producto) => (
          <FichaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}

export default App
