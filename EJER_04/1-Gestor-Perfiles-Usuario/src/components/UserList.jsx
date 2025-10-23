function UserList({ usuarios, onSeleccionarUsuario }) {
    return <>
        <ul className="list-group">
            {usuarios.map((usuario) => (
                <li
                    key={usuario.id}
                    onClick={() => onSeleccionarUsuario(usuario.id)}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                >
                    {usuario.nombre}
                </li>
            ))}
        </ul>
    </>
}

export default UserList;
