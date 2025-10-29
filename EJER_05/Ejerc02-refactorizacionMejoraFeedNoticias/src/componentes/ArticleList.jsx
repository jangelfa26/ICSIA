import { useState } from "react";
import Article from "./Article";

function ArticleList({ articulos, manejarFijar }) {
  return <>
    <div className="row justify-content-center">
      {articulos.map(function (articulo) {
        return (
          <div className="col-md-6 mb-3" key={articulo.id}>
            <Article articulo={articulo} manejarFijar={manejarFijar} />
          </div>
        );
      })}
    </div>
  </>
}

export default ArticleList;
