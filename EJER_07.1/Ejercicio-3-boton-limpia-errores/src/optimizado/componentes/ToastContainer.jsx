import React, { useCallback } from "react";
import ToastItem from "./ToastItem"

function ToastContainer({ listaErrores, borrarErrorPorId }) {
  const estiloContenedor = {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }


  const borrarErrorPorIdMemoizado = useCallback(
    (id) => {
      borrarErrorPorId(id);
    },
    [borrarErrorPorId] 
  );

  return <>
      <div style={estiloContenedor}>
        {listaErrores.map((error) => (
          <ToastItem
            key={error.id}
            error={error}
            cerrarError={borrarErrorPorIdMemoizado}
          />
        ))}
      </div>
  </>
}

export default ToastContainer

