import { useState } from "react";

function EmptyState() {
  return <>
    <div className="text-center text-secondary mt-5">
      <h4>No se encontraron artículos con los filtros seleccionados.</h4>
    </div>
  </>
}

export default EmptyState;
