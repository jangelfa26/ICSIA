import {
  Form,
  useLoaderData,
  useFetcher,
  useSubmit,
  redirect,
} from 'react-router-dom';
import {
  getProject,
  getTasksByProject,
  deleteProject,
  deleteTask,
  toggleTask,
  createTask,
} from '../utils/api.js';

export async function loader({ params }) {
  const project = getProject(params.projectId);
  if (!project) throw new Response('Not found', { status: 404 });
  const projectTasks = getTasksByProject(params.projectId);
  return { project, tasks: projectTasks };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get('_action');
  const taskId = formData.get('taskId');

  if (request.method === 'POST' && intent === 'create-task-inline') {
    const title = formData.get('title').trim();
    if (!title) return null;
    createTask({ projectId: params.projectId, title });
    return null;
  }

  if (request.method === 'POST' && intent === 'toggle-task') {
    toggleTask(taskId);
    return null;
  }

  if (request.method === 'DELETE' && intent === 'delete-task') {
    deleteTask(taskId);
    return null;
  }

  if (request.method === 'DELETE' && intent === 'delete-project') {
    deleteProject(params.projectId);
    return redirect('/projects');
  }

  return null;
}

export default function ProjectDetailsPage() {
  const { project, tasks } = useLoaderData();
  const toggleFetcher = useFetcher();
  const submit = useSubmit();

  function handleDeleteTask(taskId) {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    const formData = new FormData();
    formData.append('_action', 'delete-task');
    formData.append('taskId', taskId);
    submit(formData, {
      method: 'DELETE',
      action: `/projects/${project.id}`,
    });
  }

  function handleDeleteProject() {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    const formData = new FormData();
    formData.append('_action', 'delete-project');
    submit(formData, {
      method: 'DELETE',
      action: `/projects/${project.id}`,
    });
  }

  return (
    <section>
      <header className="project-header">
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <div>
          <button onClick={handleDeleteProject}>Eliminar Proyecto</button>
          <Form action="new-task">
            <button type="submit">Ir a formulario de tarea</button>
          </Form>
        </div>
      </header>

      <h2>Tareas</h2>
      <ul className="task-list">
        {tasks.map(task => {
          const isBusy =
            toggleFetcher.state !== 'idle' &&
            toggleFetcher.formData?.get('taskId') === task.id;
          const isCompleted =
            toggleFetcher.formData?.get('taskId') === task.id
              ? toggleFetcher.formData.get('nextCompleted') === 'true'
              : task.completed;

          return (
            <li key={task.id} className={isCompleted ? 'done' : ''}>
              <span>{task.title}</span>
              <div>
                <toggleFetcher.Form
                  method="post"
                  action={`/projects/${project.id}`}
                >
                  <input type="hidden" name="_action" value="toggle-task" />
                  <input type="hidden" name="taskId" value={task.id} />
                  <input
                    type="hidden"
                    name="nextCompleted"
                    value={(!task.completed).toString()}
                  />
                  <button type="submit" disabled={isBusy}>
                    {isCompleted
                      ? 'Marcar como incompleta'
                      : 'Marcar como completada'}
                  </button>
                </toggleFetcher.Form>

                <button onClick={() => handleDeleteTask(task.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <h2 style={{ marginTop: '2rem' }}>Añadir Nueva Tarea</h2>
      <section className="card">
        <Form method="post">
          <p>
            <label htmlFor="title">Título de la Tarea</label>
            <input id="title" name="title" />
          </p>
          <input type="hidden" name="_action" value="create-task-inline" />
          <button type="submit">Añadir Tarea</button>
        </Form>
      </section>
    </section>
  );
}
