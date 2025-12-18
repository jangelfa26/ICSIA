import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: "Ana"
  });

  return (
    <AuthContext.Provider value={{ usuarioActual, setUsuarioActual }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
