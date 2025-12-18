import { useContext, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";

function TextoPreview() {
  const { estadoTema } = useContext(ThemeContext);

  return (
    <p
      className="texto-preview"
      style={{
        color: estadoTema.primaryColor,
        fontSize: estadoTema.fontSize,
        textTransform: estadoTema.textTransform,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  );
}

export default memo(TextoPreview);
