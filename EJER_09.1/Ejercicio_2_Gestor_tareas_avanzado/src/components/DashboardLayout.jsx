import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <nav>
        <Link to="/dashboard">Ver Tareas</Link>
        <Link to="/dashboard/new">Añadir Tarea</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
