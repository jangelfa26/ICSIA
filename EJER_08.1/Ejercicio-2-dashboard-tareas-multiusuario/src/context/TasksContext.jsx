import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext();

const estadoInicial = [
  { id: 1, texto: "Configurar el entorno de desarrollo", autor: "Ana", completada: false },
  { id: 2, texto: "Crear el contexto de autenticación", autor: "Ana", completada: false },
  { id: 3, texto: "Implementar el reducer de tareas", autor: "Luis", completada: false },
  { id: 4, texto: "Optimizar componentes con React.memo", autor: "Luis", completada: false }
];

const reducerTareas = (estado, accion) => {
  switch (accion.tipo) {
    case "AÑADIR_TAREA":
      return [
        ...estado,
        {
          id: Date.now(),
          texto: accion.texto,
          autor: accion.autor,
          completada: false
        }
      ];

    case "COMPLETAR_TAREA":
      return estado.map(tarea =>
        tarea.id === accion.id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      );

    case "ELIMINAR_TAREA":
      return estado.filter(tarea => tarea.id !== accion.id);

    default:
      return estado;
  }
};

export const TasksProvider = ({ children }) => {
  const [tareas, dispatch] = useReducer(reducerTareas, estadoInicial);

  return (
    <TasksContext.Provider value={{ tareas, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTareas = () => useContext(TasksContext);
