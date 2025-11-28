import TarjetaUsuario from "./TarjetaUsuario"

export default function ListaIntermedia({ usuarios }) {
  console.log("Renderizado ListaIntermedia")

  const estiloLista = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px"
  }

  return (
    <div style={estiloLista}>
      {usuarios.map(usuario => (
        <TarjetaUsuario key={usuario.id} usuario={usuario} />
      ))}
    </div>
  )
}
