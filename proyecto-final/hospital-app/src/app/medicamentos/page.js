"use client";
import { useEffect, useState } from "react";

export default function Medicamentos() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const filtrados = data.filter(m =>
    (m.nombre ?? "")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Medicamentos</h1>

      <a href="/medicamentos/nuevo">Nuevo</a>

      <input
        placeholder="Buscar"
        onChange={e => setBusqueda(e.target.value)}
      />

      {filtrados.map(m => (
        <div key={m.id} className="card">
          <h3>{m.nombre}</h3>
          <p>{m.descripcion}</p>
          <p><b>Stock:</b> {m.stock}</p>
          <p><b>Precio:</b> {m.precio} €</p>

          <a href={`/medicamentos/${m.id}/editar`}>Editar</a>
          <button onClick={() => borrar(m.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}