// src/components/TaskList.jsx
import { useFetcher } from "react-router-dom";

const TaskList = ({ tasks, projectId }) => {
  const fetcher = useFetcher();

  const handleToggleTaskStatus = (taskId) => {
    fetcher.submit(
      { taskId, projectId },
      { method: "POST", action: `/projects/${projectId}/toggle-task-status` }
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      fetcher.submit(
        { taskId },
        { method: "DELETE", action: `/projects/${projectId}/delete-task` }
      );
    }
  };

  return (
    <div>
      <h3>Tareas</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleToggleTaskStatus(task.id)}>
              {task.completed ? "Marcar como incompleta" : "Marcar como completada"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
