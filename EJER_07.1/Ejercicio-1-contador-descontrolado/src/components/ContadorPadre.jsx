import { useState, useMemo } from "react"
import ListaIntermedia from "./ListaIntermedia"

export default function ContadorPadre() {
  console.log("Renderizado ContadorPadre")

  const [numeroContador, cambiarNumeroContador] = useState(0)

  const listaUsuarios = useMemo(() => {
    const listaGenerada = []
    for (let numeroActual = 0; numeroActual < 500; numeroActual++) {
      const usuarioCreado = {
        id: numeroActual + 1,
        nombre: "Usuario " + (numeroActual + 1),
        correo: "user" + (numeroActual + 1) + "@ejemplo.com",
        avatar: "https://i.pravatar.cc/150?img=" + ((numeroActual + 1) % 70 + 1),
        estaOnline: Math.random() > 0.5
      }
      listaGenerada.push(usuarioCreado)
    }
    return listaGenerada
  }, [])

  function aumentarContador() {
    cambiarNumeroContador(numeroContador + 1)
  }

  const estiloContenedorPrincipal = {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "sans-serif"
  }

  return (
    <div style={estiloContenedorPrincipal}>
      <h2>ContadorPadre (nivel 2)</h2>
      <p>Contador local: {numeroContador}</p>
      <button onClick={aumentarContador}
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        +1 local
      </button>

      <ListaIntermedia usuarios={listaUsuarios} />
    </div>
  )
}
