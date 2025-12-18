import { useAuth } from "../context/AuthContext";

const SelectorUsuario = () => {
  const { setUsuarioActual } = useAuth();

  const cambiarUsuario = (e) => {
    setUsuarioActual({ nombre: e.target.value });
  };

  return (
    <select onChange={cambiarUsuario}>
      <option value="Ana">Ana</option>
      <option value="Luis">Luis</option>
      <option value="Invitado">Invitado</option>
    </select>
  );
};

export default SelectorUsuario;
