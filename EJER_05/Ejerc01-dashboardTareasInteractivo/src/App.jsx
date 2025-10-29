import { useState } from "react";
import { listaTareas as tareasIniciales } from "./datos/listaTareas";
import Filtros from "./componentes/Filtros";
import ListaTareas from "./componentes/ListaTareas";
import ResumenTareas from "./componentes/ResumenTareas";

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtroActual, setFiltroActual] = useState("todas");

  function cambiarEstadoTarea(idTarea) {
    const nuevasTareas = tareas.map(function (tarea) {
      if (tarea.id == idTarea) {
        return { ...tarea, completada: !tarea.completada };
      } else {
        return tarea;
      }
    });
    setTareas(nuevasTareas);
  }

  let tareasFiltradas = [];

  if (filtroActual == "todas") {
    tareasFiltradas = tareas;
  } else {
    tareasFiltradas = tareas.filter(function (tarea) {
      return tarea.prioridad == filtroActual;
    });
  }

  return <>
    <div className="container py-4">
      <h1 className="text-center mb-4">Dashboard de Tareas</h1>

      <Filtros filtroActual={filtroActual} setFiltroActual={setFiltroActual} />

      <ListaTareas tareas={tareasFiltradas} cambiarEstadoTarea={cambiarEstadoTarea}/>

      <ResumenTareas tareasFiltradas={tareasFiltradas} totalTareas={tareas.length}/>
    </div>
  </>
}

export default App;
