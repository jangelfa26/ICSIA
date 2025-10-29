import { useState } from "react";

function Article({ articulo, manejarFijar }) {
  let clasesCard = "card shadow-sm text-dark";
  if (articulo.fijado == true) {
    clasesCard += " border-warning border-3";
  }

  let estiloCard = {};
  if (articulo.fijado) {
    estiloCard = { backgroundColor: "beige" };
  } else {
    estiloCard = { backgroundColor: "white" };
  }

  return <>
    <div className={clasesCard} style={estiloCard}>
      <div className="card-body">
        <h5 className="card-title">{articulo.titulo}</h5>
        <p className="card-text">
          Categoría: <strong>{articulo.categoria}</strong>
        </p>

        {articulo.fijado && (<p className="text-warning fw-bold">(Artículo Fijado)</p>)}

        <button className="btn btn-sm btn-outline-warning" onClick={() => manejarFijar(articulo.id)}>Fijar</button>
      </div>
    </div>
  </>
}

export default Article;
