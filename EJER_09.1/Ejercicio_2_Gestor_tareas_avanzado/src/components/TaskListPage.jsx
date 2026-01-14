import { tasks } from "../data/tasks";
import { Link } from "react-router-dom";

const TaskListPage = () => (
  <div>
    <h1>Lista de Tareas</h1>
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Link to={`/dashboard/task/${task.id}`}>{task.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskListPage;

