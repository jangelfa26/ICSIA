import { Link } from 'react-router-dom';
import { TASKS } from '../data/tasks';

const TaskListPage = () => {
  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {TASKS.map(task => (
          <li key={task.id}>
            <Link to={`/dashboard/task/${task.id}`}>{task.title}</Link> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListPage;
