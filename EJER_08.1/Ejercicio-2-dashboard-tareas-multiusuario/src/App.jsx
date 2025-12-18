import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import SelectorUsuario from "./components/SelectorUsuario";
import UserInfo from "./components/UserInfo";
import NuevaTarea from "./components/NuevaTarea";
import ListaTareas from "./components/ListaTareas";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <TasksProvider>
        <div className="App">

          <header className="cabecera">
            <h1>Ejercicio 2: Tareas Multi-usuario</h1>

            <div className="barra-usuario">
              <div>
                Usuario Actual: <SelectorUsuario />
              </div>
              <UserInfo />
            </div>
          </header>

          <NuevaTarea />

          <ListaTareas />

        </div>
      </TasksProvider>
    </AuthProvider>
  );
};

export default App;
