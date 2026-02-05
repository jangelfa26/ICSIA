import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { createTask } from '../utils/api.js';

export async function action({ request, params }) {
  const formData = await request.formData();
  const title = formData.get('title').trim();
  const errors = {};
  if (!title) errors.title = 'El título es obligatorio.';

  if (Object.keys(errors).length) return errors;

  createTask({ projectId: params.projectId, title });
  return redirect(`/projects/${params.projectId}`);
}

export default function NewTaskPage() {
  const { projectId } = useParams();
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className="card">
      <h2>Añadir nueva tarea</h2>
      <p>Proyecto: {projectId}</p>
      <Form method="post">
        <p>
          <label>Título de la tarea</label>
          <input name="title" />
          {errors?.title && <span className="error">{errors.title}</span>}
        </p>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Guardando tarea...' : 'Añadir tarea'}
        </button>
      </Form>
    </section>
  );
}