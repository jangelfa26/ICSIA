import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="dashboard-container">
    <nav className="dashboard-nav">
      <Link to="/dashboard" className="active">Ver Tareas</Link>
      <Link to="/dashboard/new">Añadir Tarea</Link> 
    </nav>
    <div className="page-container">
      <Outlet /> 
    </div>
  </div>
);

export default DashboardLayout;
