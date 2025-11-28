import IconoOnline from "./IconoOnline"

export default function Avatar({ usuario }) {
  console.log("Renderizado Avatar", usuario.id)

  const estiloContenedorGeneral = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }

  const estiloElipse = {
    border: "3px solid #000",
    borderRadius: "200px",
    padding: "15px 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
  }

  const estiloImagen = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover"
  }

  const estiloContenedorTexto = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "26px",
    fontWeight: "bold"
  }

  return (
    <div style={estiloContenedorGeneral}>
      <div style={estiloElipse}>
        <img src={usuario.avatar} style={estiloImagen} />
        <div style={estiloContenedorTexto}>
          <span>User</span>
          <IconoOnline estaOnline={usuario.estaOnline} />
        </div>
      </div>
    </div>
  )
}
