import React from "react"

function ToastItem({ error, cerrarError }) {
  console.log("ToastItem renderizado:", error.id);

  const estiloTarjetaError = {
    backgroundColor: "#6b0000",
    color: "white",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

  const estiloBotonCerrar = {
    backgroundColor: "red",
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    cursor: "pointer"
  }

  return <>
    <div style={estiloTarjetaError}>
      <span>Error: {error.mensaje}</span>
      <button
        style={estiloBotonCerrar}
        onClick={() => cerrarError(error.id)}
      >
        X
      </button>
    </div>
  </>
}

export default React.memo(ToastItem)