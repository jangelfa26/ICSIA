import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const estadoInicial = {
  primaryColor: "#6c5ce7",
  fontSize: 16,
  textTransform: "none",
};

function themeReducer(estado, accion) {
  switch (accion.type) {
    case "SET_PRIMARY_COLOR":
      return { ...estado, primaryColor: accion.payload };

    case "SET_FONT_SIZE":
      return { ...estado, fontSize: accion.payload };

    case "SET_TEXT_TRANSFORM":
      return { ...estado, textTransform: accion.payload };

    default:
      return estado;
  }
}

export function ThemeProvider({ children }) {
  const [estadoTema, dispatch] = useReducer(themeReducer, estadoInicial);

  return (
    <ThemeContext.Provider value={{ estadoTema, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}
