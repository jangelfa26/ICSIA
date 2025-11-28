import UserCard from "./UserCard"

export default function UserList({ usuarios }) {

  const estiloGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  }

  return (
    <div style={estiloGrid}>
      {usuarios.map(usuario => (
        <UserCard key={usuario.id} usuario={usuario} />
      ))}
    </div>
  )
}
