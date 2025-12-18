import { useContext, useMemo, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";

function CardPreview() {
  const { estadoTema } = useContext(ThemeContext);

  const colorSombra = useMemo(() => {
    return estadoTema.primaryColor + "99";
  }, [estadoTema.primaryColor]);

  return (
    <div
      className="tarjeta-preview"
      style={{
        backgroundColor: estadoTema.primaryColor,
        fontSize: estadoTema.fontSize - 2,
        textTransform: estadoTema.textTransform,
        boxShadow: `0 8px 20px ${colorSombra}`,
      }}
    >
      <p>Esta es una tarjeta con estilos de tema.</p>
      <p>Un texto más pequeño.</p>
    </div>
  );
}

export default memo(CardPreview);
