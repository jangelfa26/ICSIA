import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createProject } from '../utils/api.js';

export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();

  const errors = {};
  if (!title || title.length < 5) {
    errors.title = 'El nombre debe tener al menos 5 caracteres.';
  }
  if (Object.keys(errors).length) {
    return errors;
  }

  createProject({ title, description });
  return redirect('/projects');
}

export default function NewProjectPage() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className="card">
      <h2>Crear Nuevo Proyecto</h2>
      <Form method="post">
        <p>
          <label>Nombre del Proyecto</label>
          <input name="title" />
          {errors?.title && <span className="error">{errors.title}</span>}
        </p>
        <p>
          <label>Descripción</label>
          <textarea name="description" rows="3" />
        </p>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Guardando proyecto...' : 'Crear Proyecto'}
        </button>
      </Form>
    </section>
  );
}