import BotonPreview from "./BotonPreview";
import TextoPreview from "./TextoPreview";
import CardPreview from "./CardPreview";

function PanelPreview() {
  return (
    <>
      <h2>Vista Previa de Componentes</h2>

      <div className="preview-card">
        <h3>Botón de Ejemplo</h3>
        <BotonPreview />
      </div>

      <div className="preview-card">
        <h3>Texto de Ejemplo</h3>
        <TextoPreview />
      </div>

      <div className="preview-card">
        <h3>Tarjeta de Ejemplo</h3>
        <CardPreview />
      </div>
    </>
  );
}

export default PanelPreview;
