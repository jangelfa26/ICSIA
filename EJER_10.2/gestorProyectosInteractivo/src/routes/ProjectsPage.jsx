import { Link, useLoaderData } from 'react-router-dom';
import { getProjects } from '../utils/api.js';

export function loader() {
  return getProjects();
}

export default function ProjectsPage() {
  const projects = useLoaderData();

  return (
    <section>
      <h2>Tus Proyectos</h2>
      <p><Link to="/projects/new">Crear nuevo proyecto</Link></p>
      <ul className="project-list">
        {projects.map(p => (
          <li key={p.id}>
            <h3>
              <Link to={`/projects/${p.id}`}>{p.title}</Link>
            </h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
