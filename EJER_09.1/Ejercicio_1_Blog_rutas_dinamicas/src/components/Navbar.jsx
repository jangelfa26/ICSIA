import { NavLink } from 'react-router-dom';

const BarraNavegacion = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" className="nav-link">Inicio</NavLink></li>
        <li><NavLink to="/posts" className="nav-link">Artículos</NavLink></li>
      </ul>
    </nav>
  );
};

export default BarraNavegacion;
