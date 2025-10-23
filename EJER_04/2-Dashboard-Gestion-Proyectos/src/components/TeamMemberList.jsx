export function TeamMemberList({ miembros }) {
    return (
        <div>
            {miembros.map(miembro => (
                <span key={miembro.id} className="badge bg-info text-dark me-1">{miembro.nombre}</span>
            ))}
        </div>
    );
}