import { ThemeProvider } from "./context/ThemeContext"; 
import ControlesTema from "./components/ControlesTema";
import BotonPreview from "./components/BotonPreview";
import TextoPreview from "./components/TextoPreview";
import CardPreview from "./components/CardPreview";
import PanelControles from "./components/PanelControles";
import PanelPreview from "./components/PanelPreview";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider> 
      <div className="app">
        <h1>Ejercicio 3: Editor de Temas UI</h1>

        <div className="layout">
          <aside className="panel-controles">
            <PanelControles />
          </aside>

          <main className="panel-preview">
            <PanelPreview />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
