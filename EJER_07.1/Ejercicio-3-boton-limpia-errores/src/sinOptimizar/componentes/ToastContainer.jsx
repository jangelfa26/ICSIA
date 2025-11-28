import ToastItem from "./ToastItem"

function ToastContainer({ listaErrores, borrarErrorPorId }) {
  const estiloContenedor = {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }

  return <>
    <div style={estiloContenedor}>
      {listaErrores.map(error => (
        <ToastItem
          key={error.id}
          error={error}
          cerrarError={borrarErrorPorId}
        />
      ))}
    </div>
  </>
}

export default ToastContainer
