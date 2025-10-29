import { useState } from "react";

function ResumenTareas({ tareasFiltradas, totalTareas }) {
  if (tareasFiltradas.length == 0) {
    return <>
      <p className="text-center text-muted">No hay tareas para este filtro.</p>
    </>
  }

  let todasCompletadas = true;
  for (let i = 0; i < tareasFiltradas.length; i++) {
    if (tareasFiltradas[i].completada === false) {
      todasCompletadas = false;
    }
  }

  if (todasCompletadas === true) {
    return <>
      <p className="text-center text-success fw-bold">
        ¡Felicidades! Has completado todas las tareas de esta sección.
      </p>
    </>
  }

  return <>
    <p className="text-center">
      Mostrando {tareasFiltradas.length} de {totalTareas} tareas.
    </p>
  </>
}

export default ResumenTareas;
