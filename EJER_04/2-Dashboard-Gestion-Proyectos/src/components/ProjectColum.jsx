import { ProjectCard } from './ProjectCard';
export function ProjectColumn({ titulo, proyectos, onCambiarEstado }) {
    return (
        <div className="col">
            <div className="card" style={{ minHeight: '80vh' }}>
                <div className="card-body">
                    <h5 className="card-title">{titulo}</h5>
                    <hr />
                    {proyectos.length === 0 && <p className="text-muted">No hay proyectos</p>}
                    {proyectos.map(proyecto => (
                        <ProjectCard key={proyecto.id} proyecto={proyecto} onCambiarEstado={onCambiarEstado} />
                    ))}
                </div>
            </div>
        </div>
    );
}