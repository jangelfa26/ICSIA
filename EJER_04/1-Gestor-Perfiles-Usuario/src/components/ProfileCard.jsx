function ProfileCard({ usuario }) {
    return <>
        <div className="card">
            <div className="card-body">
                <img src={usuario.avatarUrl} alt={usuario.nombre} className="rounded-circle mb-3" width="80" />
                <h4>{usuario.nombre}</h4>
                <p>{usuario.email}</p>

                <h5>Información de Contacto</h5>
                <p><strong>Calle:</strong> {usuario.direccion.calle}</p>
                <p><strong>Ciudad:</strong> {usuario.direccion.ciudad}</p>

                <h5>Aficiones</h5>
                <div>
                    {usuario.aficiones.map((aficion, i) => (
                        <span
                            key={i}
                            className="badge bg-secondary me-1"
                        >
                            {aficion}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default ProfileCard;
