import { useState } from "react";

function Filtros({ filtroActual, setFiltroActual }) {
  const opciones = ["todas", "alta", "media", "baja"];

  return <>
    <div className="d-flex justify-content-center mb-4">
      {opciones.map(function (opcion) {
        let clasesBoton = "btn mx-1 ";

        if (filtroActual === opcion) {
          clasesBoton += "btn-primary";
        } else {
          clasesBoton += "btn-outline-primary";
        }

        return (
          <button
            key={opcion}
            className={clasesBoton}
            onClick={() => setFiltroActual(opcion)}
          >
            {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
          </button>
        );
      })}
    </div>
  </>
}

export default Filtros;
