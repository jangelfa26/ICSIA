import { TeamMemberList } from './TeamMemberList';

export function ProjectCard({ proyecto, onCambiarEstado }) {
    const opciones = ['Pendiente', 'En Progreso', 'Completado'];

    function handleChange(event) {
        const nuevo = event.target.value;
        if (nuevo == proyecto.estado) return;
        onCambiarEstado(proyecto.id, nuevo);
    }

    let colorPrioridad;
    if (proyecto.prioridad === 'Alta') {
        colorPrioridad = 'bg-danger';
    } else if (proyecto.prioridad === 'Media') {
        colorPrioridad = 'bg-warning';
    } else {
        colorPrioridad = 'bg-success';
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <span  className={`rounded-circle ${colorPrioridad}`}  style={{ width: '15px', height: '15px', display: 'inline-block' }}></span>
                        <span>{proyecto.titulo}</span>
                    </div>
                    <small className="badge bg-secondary">{proyecto.prioridad}</small>
                </h5>
                <p className="card-text" style={{ fontSize: '0.9rem' }}>{proyecto.descripcion}</p>

                <div className="mb-2">
                    <strong>Responsables:</strong>
                    <TeamMemberList miembros={proyecto.responsables} />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                    <select className="form-select form-select-sm w-50" value={proyecto.estado} onChange={handleChange}>
                        {opciones.map(opcion => (
                            <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onCambiarEstado(proyecto.id, 'Pendiente')}> Reset Pendiente </button>
                </div>
            </div>
        </div>
    );
}
