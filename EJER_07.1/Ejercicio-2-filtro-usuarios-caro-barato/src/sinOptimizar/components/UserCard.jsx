export default function UserCard({ usuario }) {
  const estiloTarjeta = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "15px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  }

  const estiloTitulo = {
    fontSize: "16px",
    fontWeight: "bold"
  }

  const estiloCorreo = {
    marginTop: "8px",
    color: "#444"
  }

  const estiloEmpresa = {
    marginTop: "5px",
    color: "#666"
  }

  return (
    <div style={estiloTarjeta}>
      <p style={estiloTitulo}>{usuario.nombre}</p>
      <p style={estiloCorreo}>{usuario.correo}</p>
      <p style={estiloEmpresa}>{usuario.empresa}</p>
    </div>
  )
}
