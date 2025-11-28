export default function SearchInput({ textoBusqueda, cambiarTextoBusqueda }) {
  const estiloInput = {
    width: "100%",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }

  function escribirTexto(evento) {
    cambiarTextoBusqueda(evento.target.value)
  }

  return <input style={estiloInput} value={textoBusqueda} onChange={escribirTexto} />
}
