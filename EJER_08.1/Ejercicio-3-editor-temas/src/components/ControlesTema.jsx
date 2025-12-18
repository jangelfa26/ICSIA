import { ThemeContext } from "../context/ThemeContext";


const ControlesTema = () => {
  const { tema, dispatch } = useTheme();


  return (
    <div className="panel">
      <h2>Controles del Tema</h2>


      <label>Color Primario:</label>
      <input
        type="color"
        value={tema.primaryColor}
        onChange={(e) =>
          dispatch({ type: "SET_PRIMARY_COLOR", payload: e.target.value })
        }
      />


      <label>Tamaño de Fuente: {tema.fontSize}px</label>
      <input
        type="range"
        min="12"
        max="30"
        value={tema.fontSize}
        onChange={(e) =>
          dispatch({ type: "SET_FONT_SIZE", payload: Number(e.target.value) })
        }
      />


      <label>Transformación de Texto:</label>
      <div className="botones">
        <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "none" })}>Ninguna</button>
        <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "uppercase" })}>Mayúsculas</button>
        <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "lowercase" })}>Minúsculas</button>
        <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "capitalize" })}>Capitalizar</button>
      </div>
    </div>
  );
};


export default ControlesTema;