import { useState } from 'react';
import { initialProjects } from './datos/projects';
import { ProjectColumn } from './components/ProjectColumn';
export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [busqueda, setBusqueda] = useState('');
  function handleActualizarEstado(proyectoId, nuevoEstado) {
    setProjects(prev => prev.map(p => p.id === proyectoId ? { ...p, estado: nuevoEstado } : p));
  }
  const pendientes = projects.filter(p => p.estado === 'Pendiente' && p.titulo.toLowerCase().includes(busqueda.toLowerCase()));
  const enprogreso = projects.filter(p => p.estado === 'En Progreso' && p.titulo.toLowerCase().includes(busqueda.toLowerCase()));
  const completados = projects.filter(p => p.estado === 'Completado' && p.titulo.toLowerCase().includes(busqueda.toLowerCase()));
  return <>
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard de Proyectos</h3>
        <input className="form-control w-25" placeholder="Buscar por título..." value={busqueda} onChange={event => setBusqueda(event.target.value)} />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        <ProjectColumn titulo="Pendiente" proyectos={pendientes} onCambiarEstado={handleActualizarEstado} />
        <ProjectColumn titulo="En Progreso" proyectos={enprogreso} onCambiarEstado={handleActualizarEstado} />
        <ProjectColumn titulo="Completado" proyectos={completados} onCambiarEstado={handleActualizarEstado} />
      </div>
    </div>
  </>
}