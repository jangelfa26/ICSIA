import { useTareas } from "../context/TasksContext";
import TareaItem from "./TareaItem";

const ListaTareas = () => {
  const { tareas } = useTareas();

  return (
    <div>
      <h2>Tareas Pendientes</h2>
      {tareas.map(tarea => (
        <TareaItem key={tarea.id} tarea={tarea} />
      ))}
    </div>
  );
};

export default ListaTareas;
