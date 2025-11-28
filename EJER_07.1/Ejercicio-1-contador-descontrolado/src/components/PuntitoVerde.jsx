export default function PuntitoVerde({ estado }) {
  console.log("Renderizado PuntitoVerde")

  const estiloCirculo = {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: estado ? "green" : "red"
  }

  return <div style={estiloCirculo}></div>
}
