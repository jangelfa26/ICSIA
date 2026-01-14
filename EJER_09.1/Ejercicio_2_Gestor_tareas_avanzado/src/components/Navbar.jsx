import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            Panel de Tareas
          </Link>
        </li>
        <li>
          <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
            Perfil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
