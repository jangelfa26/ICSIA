"use client";

import { useEffect, useState } from "react";

export default function Medicamentos() {

  const [data, setData] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [orden, setOrden] = useState("nombre_asc");

  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const cargar = () => {

    fetch("/api/medicamentos")
      .then(r => r.json())
      .then(setData);
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {

    if (!confirm("¿Eliminar medicamento?")) return;

    await fetch(`/api/medicamentos/${id}`, {
      method: "DELETE"
    });

    cargar();
  };

  const filtrados = data
    .filter(m => {

      const coincideBusqueda =
        (m.nombre ?? "")
          .toLowerCase()
          .includes(busqueda.toLowerCase());

      const coincideMin =
        !precioMin ||
        Number(m.precio) >= Number(precioMin);

      const coincideMax =
        !precioMax ||
        Number(m.precio) <= Number(precioMax);

      return (
        coincideBusqueda &&
        coincideMin &&
        coincideMax
      );
    })
    .sort((a, b) => {

      switch (orden) {

        case "nombre_asc":
          return a.nombre.localeCompare(b.nombre);

        case "nombre_desc":
          return b.nombre.localeCompare(a.nombre);

        case "precio_asc":
          return a.precio - b.precio;

        case "precio_desc":
          return b.precio - a.precio;

        case "stock_asc":
          return a.stock - b.stock;

        case "stock_desc":
          return b.stock - a.stock;

        default:
          return 0;
      }
    });

  const getStockClass = (stock) => {

    if (stock <= 0) return "stock-empty";

    if (stock <= 10) return "stock-low";

    return "stock-ok";
  };

  return (

    <div className="medicamentos-container">

      <div className="medicamentos-header">

        <div>
          <h1>Medicamentos</h1>
          <p>
            Gestión farmacéutica y stock
          </p>
        </div>

        <a
          href="/medicamentos/nuevo"
          className="btn-primary"
        >
          + Nuevo medicamento
        </a>

      </div>

      <div className="medicamentos-filtros">

        <input
          placeholder="Buscar medicamento..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={e => setPrecioMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={e => setPrecioMax(e.target.value)}
        />

        <select
          value={orden}
          onChange={e => setOrden(e.target.value)}
        >
          <option value="nombre_asc">
            Nombre A-Z
          </option>

          <option value="nombre_desc">
            Nombre Z-A
          </option>

          <option value="precio_asc">
            Precio menor-mayor
          </option>

          <option value="precio_desc">
            Precio mayor-menor
          </option>

          <option value="stock_asc">
            Stock menor-mayor
          </option>

          <option value="stock_desc">
            Stock mayor-menor
          </option>
        </select>

      </div>

      <div className="medicamentos-grid">

        {filtrados.map(m => (

          <div
            key={m.id}
            className="medicamento-card"
          >

            <div className="medicamento-top">

              <div>

                <h3>{m.nombre}</h3>

                <span className="med-id">
                  #{m.id}
                </span>

              </div>

              <div className={getStockClass(m.stock)}>
                {m.stock <= 0
                  ? "Sin stock"
                  : `${m.stock} uds`
                }
              </div>

            </div>

            <p className="med-desc">
              {m.descripcion || "Sin descripción"}
            </p>

            <div className="med-info">

              <div>
                <span>Precio</span>
                <strong>{m.precio} €</strong>
              </div>

            </div>

            <div className="med-actions">
              <button className="btn-edit" onClick={() => window.location.href = `/medicamentos/${m.id}/editar`}>
                ✏️
              </button>
              <button
                onClick={() => borrar(m.id)}
                className="btn-delete"
              >
                🗑️
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}