// src/App.jsx
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* Aquí puedes agregar el encabezado o cualquier estructura común */}
      <header>
        <h1>Gestor de Proyectos</h1>
      </header>
      
      {/* El Outlet es donde se cargan las páginas según la ruta */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
