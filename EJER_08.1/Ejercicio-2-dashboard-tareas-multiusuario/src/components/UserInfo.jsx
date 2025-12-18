import { useAuth } from "../context/AuthContext";

const UserInfo = () => {
  const { usuarioActual } = useAuth();

  return (
    <p>Logueado como: <strong>{usuarioActual.nombre}</strong></p>
  );
};

export default UserInfo;
