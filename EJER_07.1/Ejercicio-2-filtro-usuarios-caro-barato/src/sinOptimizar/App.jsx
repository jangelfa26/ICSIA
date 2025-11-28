import { useState, useMemo } from "react"
//import './App.css'
import SearchInput from "./components/SearchInput.jsx"
import UserList from "./components/UserList"

export default function App() {
  const [textoBusqueda, cambiarTextoBusqueda] = useState("")

  const listaUsuarios = useMemo(() => {
    const listaCreada = []
    for (let numeroActual = 0; numeroActual < 10000; numeroActual++) {
      listaCreada.push({
        id: numeroActual + 1,
        nombre: "Usuario " + (numeroActual + 1) + " Nombre0",
        correo: "usuario" + (numeroActual + 1) + "@ejemplo.com",
        empresa: "Empresa " + (numeroActual + 1) + " S.A."
      })
    }
    return listaCreada
  }, [])

  const listaFiltrada = listaUsuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
    usuario.correo.toLowerCase().includes(textoBusqueda.toLowerCase())
  )

  const estiloContenedor = {
    width: "90%",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "sans-serif"
  }

  const estiloTitulo = {
    fontWeight: "bold",
    marginBottom: "10px"
  }

  const estiloTip = {
    color: "#777",
    fontSize: "14px",
    margin: "10px 0"
  }

  const estiloResultados = {
    fontSize: "15px",
    margin: "15px 0"
  }

  return (
    <div style={estiloContenedor}>
      <p style={estiloTitulo}>Buscar por nombre o email:</p>

      <SearchInput textoBusqueda={textoBusqueda} cambiarTextoBusqueda={cambiarTextoBusqueda} />

      <p style={estiloTip}>Tip: Escribe rápido para ver el lag sin optimizar.</p>

      <p style={estiloResultados}>{listaFiltrada.length} usuarios encontrados</p>

      <UserList usuarios={listaFiltrada} />
    </div>
  )
}

