import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTareas } from "../context/TasksContext";

const TareaItem = ({ tarea }) => {
  const { usuarioActual } = useAuth();
  const { dispatch } = useTareas();

  const esAutor = tarea.autor === usuarioActual.nombre;
  const esInvitado = usuarioActual.nombre === "Invitado";

  return (
    <div className={`tarea ${tarea.completada ? "completada" : ""}`}>
  <span>
    {tarea.texto}
    <span className="autor">(autor: {tarea.autor})</span>
  </span>

  <div className="botones">
    {!esInvitado && esAutor && (
      <>
        <button
          className="boton-completar"
          onClick={() => dispatch({ tipo: "COMPLETAR_TAREA", id: tarea.id })}
        >
          {tarea.completada ? "Deshacer" : "Completar"}
        </button>

        <button
          className="boton-eliminar"
          onClick={() => dispatch({ tipo: "ELIMINAR_TAREA", id: tarea.id })}
        >
          Eliminar
        </button>
      </>
    )}
  </div>
</div>

  );
};

export default React.memo(TareaItem);
