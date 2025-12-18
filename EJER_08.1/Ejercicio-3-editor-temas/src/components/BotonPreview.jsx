import { useContext, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";

function BotonPreview() {
  const { estadoTema } = useContext(ThemeContext);

  return (
    <button
      className="boton-preview"
      style={{
        backgroundColor: estadoTema.primaryColor,
        fontSize: estadoTema.fontSize,
        textTransform: estadoTema.textTransform,
      }}
    >
      Haz Clic
    </button>
  );
}

export default memo(BotonPreview);
