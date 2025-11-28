import { useState, useCallback } from "react"
import ToastContainer from "./componentes/ToastContainer.jsx"

function App() {
  const [listaErrores, cambiarListaErrores] = useState([])

  const agregarErrorNuevo = useCallback(() => {
    const errorNuevo = {
      id: crypto.randomUUID(),
      mensaje: "Error " + Math.floor(Math.random() * 500 + 100) + " del servidor"
    }
    cambiarListaErrores(prev => [...prev, errorNuevo])
  }, [])

  const limpiarTodosLosErrores = useCallback(() => {
    cambiarListaErrores([])
  }, [])

  const borrarUnError = useCallback((idDelError) => {
    cambiarListaErrores(prev => prev.filter(error => error.id !== idDelError))
  }, [])

  const estiloPagina = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "sans-serif"
  }

  const estiloPanelIzquierdo = {
    width: "40%",
    backgroundColor: "black",
    color: "white",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }

  const estiloBotonVerde = {
    backgroundColor: "green",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }

  const estiloBotonRojo = {
    backgroundColor: "red",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }

  const estiloPanelDerecho = {
    width: "60%",
    backgroundColor: "white",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }

  return <>
    <div style={estiloPagina}>
      <div style={estiloPanelIzquierdo}>
        <h1>Ejercicio 3</h1>

        <button style={estiloBotonVerde} onClick={agregarErrorNuevo}>
          Añadir error
        </button>

        <button style={estiloBotonRojo} onClick={limpiarTodosLosErrores}>
          Limpiar todos
        </button>
      </div>

      <div style={estiloPanelDerecho}>
        <p style={{ color: "red", fontSize: "18px" }}>
          Errores activos ({listaErrores.length})
        </p>

        <ToastContainer
          listaErrores={listaErrores}
          borrarErrorPorId={borrarUnError}
        />
      </div>
    </div>
  </>
}

export default App
