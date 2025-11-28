import PuntitoVerde from "./PuntitoVerde"

export default function IconoOnline({ estaOnline }) {
  console.log("Renderizado IconoOnline")
  return <PuntitoVerde estado={estaOnline} />
}
