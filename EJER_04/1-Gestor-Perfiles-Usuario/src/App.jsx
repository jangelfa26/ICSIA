import { useState } from "react";
import { usuarios } from "./datos/Usuarios";
import UserList from "./components/UserList";
import ProfileCard from "./components/ProfileCard";
import SearchBar from "./components/searchBar";

function App() {
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);
  const [filtro, setFiltro] = useState("");

  const usuarioSeleccionado = usuarios.find(u => u.id === usuarioSeleccionadoId);

  function manejarSeleccion(id) {
    setUsuarioSeleccionadoId(id);
  }

  const usuariosFiltrados = usuarios.filter(u => u.nombre.includes(filtro));

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Gestor de Perfiles de Usuario</h3>
      <div className="row">
        <div className="col-4">
          <SearchBar onBuscar={setFiltro} />
          <UserList usuarios={usuariosFiltrados} onSeleccionarUsuario={manejarSeleccion} />
        </div>
        <div className="col-8">
          {usuarioSeleccionado ? (
            <ProfileCard usuario={usuarioSeleccionado} />
          ) : (
            <p>Selecciona un usuario para ver los detalles</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
