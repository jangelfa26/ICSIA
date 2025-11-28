import React from "react"

function UserCard({ usuario }) {
  const estiloTarjeta = {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  }

  const estiloTitulo = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px"
  }

  const estiloLinea = {
    fontSize: "14px",
    marginBottom: "3px"
  }

  return (
    <div style={estiloTarjeta}>
      <p style={estiloTitulo}>{usuario.nombre}</p>
      <p style={estiloLinea}>{usuario.correo}</p>
      <p style={estiloLinea}>{usuario.empresa}</p>
    </div>
  )
}

export default React.memo(UserCard)
