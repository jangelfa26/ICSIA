import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ColorPicker from "./ColorPicker";

function PanelControles() {
  const { estadoTema, dispatch } = useContext(ThemeContext);

  return (
    <>
      <h2>Controles del Tema</h2>

      <div className="control">
        <label>Color Primario:</label>
        <ColorPicker />
      </div>

      <div className="control">
        <label>Tamaño de Fuente: {estadoTema.fontSize}px</label>
        <input
          type="range"
          min="12"
          max="30"
          value={estadoTema.fontSize}
          onChange={(e) =>
            dispatch({
              type: "SET_FONT_SIZE",
              payload: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="control">
        <label>Transformación de Texto:</label>
        <div className="grupo-botones">
          <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "none" })}>
            Ninguna
          </button>
          <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "uppercase" })}>
            Mayúsculas
          </button>
          <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "lowercase" })}>
            Minúsculas
          </button>
          <button onClick={() => dispatch({ type: "SET_TEXT_TRANSFORM", payload: "capitalize" })}>
            Capitalizar
          </button>
        </div>
      </div>
    </>
  );
}

export default PanelControles;
