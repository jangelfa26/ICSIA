function UserList({ usuarios }, { onSeleccionarUsuario }) {
    let listaUsuarios = document.getElementById("listaUsuarios");
    listaUsuarios.addEventListener("click", (event) => {
        let usuarioSeleccionado = event.target;
        let idSeleccionado = usuarioSeleccionado.id
        onSeleccionarUsuario(idSeleccionado)
    })
    return (
        <ul id="listaUsuarios">

            {usuarios.map((usuario, index) => (
                <li key={index}>{usuario.nombre}</li>

            ))}

        </ul>
    );

}