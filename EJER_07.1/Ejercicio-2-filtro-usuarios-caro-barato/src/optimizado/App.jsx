import { useState, useMemo } from "react"
import SearchInput from "./components/SearchInput"
import UserList from "./components/UserList"

export default function App() {
  const [textoBusqueda, cambiarTextoBusqueda] = useState("")

  const listaUsuarios = useMemo(() => {
    const lista = []
    for (let numeroActual = 0; numeroActual < 10000; numeroActual++) {
      const usuario = {
        id: numeroActual + 1,
        nombre: "Usuario " + (numeroActual + 1) + " Nombre" + numeroActual,
        correo: "usuario" + (numeroActual + 1) + "@ejemplo.com",
        empresa: "Empresa " + (numeroActual + 1) + " S.A."
      }
      lista.push(usuario)
    }
    return lista
  }, [])

  const listaFiltrada = useMemo(() => {
    const texto = textoBusqueda.toLowerCase()
    return listaUsuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.correo.toLowerCase().includes(texto)
    )
  }, [textoBusqueda, listaUsuarios])

  const estiloContenedor = {
    width: "95%",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "sans-serif"
  }

  const estiloTextoPequeno = {
    fontSize: "12px",
    color: "#666",
    marginTop: "5px"
  }

  return (
    <div style={estiloContenedor}>
      <p style={{ fontWeight: "bold" }}>Buscar por nombre o email:</p>

      <SearchInput textoBusqueda={textoBusqueda} cambiarTextoBusqueda={cambiarTextoBusqueda} />

      <p style={estiloTextoPequeno}>Tip: Escribe rápido para ver el lag sin optimizar.</p>

      <p>{listaFiltrada.length} usuarios encontrados</p>

      <UserList usuarios={listaFiltrada} />
    </div>
  )
}
