import Avatar from "./Avatar"

export default function TarjetaUsuario({ usuario }) {
  console.log("Renderizado TarjetaUsuario", usuario.id)

  const estiloTarjeta = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    width: "100%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  }

  const estiloNombre = {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px"
  }

  const estiloCorreo = {
    color: "#555",
    marginTop: "5px"
  }

  return (
    <div style={estiloTarjeta}>
      <Avatar usuario={usuario} />
      <p style={estiloNombre}>{usuario.nombre}</p>
      <p style={estiloCorreo}>{usuario.correo}</p>
    </div>
  )
}
