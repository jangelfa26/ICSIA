import { useState } from "react";
import { listaArticulos } from "./datos/listaArticulos";
import SearchBar from "./componentes/SearchBar";
import ArticleList from "./componentes/ArticleList";
import EmptyState from "./componentes/EmptyState";

function App() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [articulos, setArticulos] = useState(listaArticulos);

  function manejarFijar(idArticulo) {
    const nuevosArticulos = articulos.map(function (articulo) {
      if (articulo.id == idArticulo) {
        return { ...articulo, fijado: true };
      } else {
        return { ...articulo, fijado: false };
      }
    });

    const articuloFijado = nuevosArticulos.find(function (a) {
      return a.fijado;
    });

    let otros = nuevosArticulos.filter(function (a) {
      return a.fijado === false;
    });

    let listaFinal = [];
    if (articuloFijado) {
      listaFinal = [articuloFijado, ...otros];
    } else {
      listaFinal = nuevosArticulos;
    }

    setArticulos(listaFinal);
  }

  let articulosFiltrados = articulos.filter(function (articulo) {
    let coincideBusqueda = articulo.titulo
      .toLowerCase()
      .includes(terminoBusqueda.toLowerCase());

    let coincideCategoria = false;
    if (categoriaSeleccionada == "todas") {
      coincideCategoria = true;
    } else if (articulo.categoria == categoriaSeleccionada) {
      coincideCategoria = true;
    }

    if (coincideBusqueda && coincideCategoria) {
      return true;
    } else {
      return false;
    }
  });

  let contenido;
  if (articulosFiltrados.length > 0) {
    contenido = <ArticleList articulos={articulosFiltrados} manejarFijar={manejarFijar} />;
  } else {
    contenido = <EmptyState />;
  }

  return <>
    <div className="container py-4">
      <h1 className="text-center mb-4 text-warning">Seccion de Noticias</h1>

      <SearchBar terminoBusqueda={terminoBusqueda} setTerminoBusqueda={setTerminoBusqueda} />

      <div className="text-center my-3">
        <button className="btn btn-outline-light mx-1" onClick={() => setCategoriaSeleccionada("todas")}>Todas</button>
        <button className="btn btn-outline-info mx-1" onClick={() => setCategoriaSeleccionada("React")}>React </button>
        <button className="btn btn-outline-success mx-1" onClick={() => setCategoriaSeleccionada("CSS")}>CSS</button>
        <button className="btn btn-outline-warning mx-1" onClick={() => setCategoriaSeleccionada("JavaScript")}>JavaScript</button>
      </div>

      <hr className="border-light" />

      {contenido}
    </div>
  </>
}

export default App;
