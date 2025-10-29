import { useState } from "react";
import Tarea from "./Tarea";

function ListaTareas({ tareas, cambiarEstadoTarea }) {
  return <>
    <div className="list-group mb-4">
      {tareas.map(function (tarea) {
        return (
          <Tarea key={tarea.id} tarea={tarea} cambiarEstadoTarea={cambiarEstadoTarea} />
        );
      })}
    </div>
  </>
}

export default ListaTareas;
