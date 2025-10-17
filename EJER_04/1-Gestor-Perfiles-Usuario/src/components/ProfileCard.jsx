function ProfileCard({ usuario }) {
    return <>
        <div id="perfil">
            <div className="infoPersonal">
                <h1>{usuario.nombre}</h1>
                <p>{usuario.email}</p>
            </div>
            <div className="infoContacto">
                <h2>Información de Contacto</h2>
                <p><strong>Calle: </strong> {usuario.direccion.calle} </p>
                <p><strong>Ciudad: </strong> {usuario.direccion.ciudad}</p>
            </div>
            <div id="aficiones">
                {usuario.aficiones.map((aficion, index) => (
                    <p key={index}>{aficion}</p>
                ))}
            </div>
        </div>
    </>
}