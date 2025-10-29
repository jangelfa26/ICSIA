import { useState } from "react";

function Tarea({ tarea, cambiarEstadoTarea }) {
  let color = "";

  if (tarea.prioridad === "alta") {
    color = "danger";
  }

  if (tarea.prioridad === "media") {
    color = "warning";
  }

  if (tarea.prioridad === "baja") {
    color = "success";
  }

  let estiloFondo = {};
  if (tarea.completada == true) {
    estiloFondo = {
      backgroundColor: "whitesmoke",
      textDecoration: "line-through",
    };
  } else {
    estiloFondo = {
      backgroundColor: "white",
      textDecoration: "none",
    };
  }

  return <>
    <div className={`list-group-item d-flex align-items-center justify-content-between border-start border-4 border-${color}`} style={estiloFondo}>
      <span onClick={() => cambiarEstadoTarea(tarea.id)} style={{ cursor: "pointer" }}>
        {tarea.texto}
      </span>
      <span className={`badge bg-${color}`}>{tarea.prioridad}</span>
    </div>
  </>
}

export default Tarea;
