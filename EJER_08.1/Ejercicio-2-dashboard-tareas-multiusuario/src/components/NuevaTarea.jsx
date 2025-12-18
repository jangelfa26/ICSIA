import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTareas } from "../context/TasksContext";

const NuevaTarea = () => {
  const [texto, setTexto] = useState("");
  const { usuarioActual } = useAuth();
  const { dispatch } = useTareas();

  const añadirTarea = () => {
    if (texto.trim() === "" || usuarioActual.nombre === "Invitado") return;

    dispatch({
      tipo: "AÑADIR_TAREA",
      texto,
      autor: usuarioActual.nombre
    });

    setTexto("");
  };

  return (
    <div className="nueva-tarea">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        disabled={usuarioActual.nombre === "Invitado"}
      />
      <button onClick={añadirTarea} disabled={usuarioActual.nombre === "Invitado"}>
        Añadir
      </button>
    </div>
  );
};

export default NuevaTarea;
