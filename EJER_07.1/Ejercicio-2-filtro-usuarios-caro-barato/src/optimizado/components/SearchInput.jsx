import React from "react"

function SearchInput({ textoBusqueda, cambiarTextoBusqueda }) {
  const estiloInput = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px"
  }

  function manejarCambio(evento) {
    cambiarTextoBusqueda(evento.target.value)
  }

  return (
    <input
      type="text"
      value={textoBusqueda}
      onChange={manejarCambio}
      style={estiloInput}
    />
  )
}

export default React.memo(SearchInput)
