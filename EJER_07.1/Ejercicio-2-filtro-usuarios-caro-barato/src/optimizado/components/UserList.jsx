import React from "react"
import UserCard from "./UserCard"

function UserList({ usuarios }) {
  const estiloLista = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  }

  return (
    <div style={estiloLista}>
      {usuarios.map(usuario => (
        <UserCard key={usuario.id} usuario={usuario} />
      ))}
    </div>
  )
}

export default React.memo(UserList)
