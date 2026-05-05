"use client";
import { useEffect, useState } from "react";

export default function Historial() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargar = () => {
    fetch("/api/historial")
      .then(r => r.json())
      .then(setData);
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;

    await fetch(`/api/historial/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const filtrados = data.filter(h =>
    (h.diagnostico ?? "")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Historial clínico</h1>

      <a href="/historial/nuevo">Nuevo</a>

      <input
        placeholder="Buscar diagnóstico"
        onChange={e => setBusqueda(e.target.value)}
      />

      {filtrados.map(h => (
        <div key={h._id} className="card">
          <p><b>{h.diagnostico}</b></p>
          <p>Paciente ID: {h.id_paciente}</p>

          {h.observaciones && <p>{h.observaciones}</p>}

          <button onClick={() => borrar(h._id)}>Eliminar</button>
          <a href={`/historial/editar/${h._id}`}>Editar</a>
        </div>
      ))}
    </div>
  );
}