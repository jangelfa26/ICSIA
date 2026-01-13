import { Link, Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/dashboard">Panel de Tareas</Link>
        <Link to="/profile">Perfil</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default RootLayout;
