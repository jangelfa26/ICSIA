import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="main-header">
      <nav className="nav-bar">
        <h1 className="app-title">Gestor de Proyectos</h1>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              Tus Proyectos
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects/new">
              Añadir Nuevo Proyecto
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
