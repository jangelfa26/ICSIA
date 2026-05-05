"use client";
import { useEffect, useState } from "react";

export default function Medicos() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    try {
      const res = await fetch("/api/medicos");
      if (!res.ok) throw new Error("Error cargando médicos");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {
    if (!confirm("¿Eliminar médico?")) return;

    await fetch(`/api/medicos/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const filtrados = data.filter(m =>
    m.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Médicos</h1>

      <a href="/medicos/nuevo">Nuevo médico</a>

      <input
        placeholder="Buscar médico"
        onChange={e => setBusqueda(e.target.value)}
      />

      {filtrados.map(m => (
        <div key={m.id} className="card">
          <a href={`/medicos/${m.id}`}>
            {m.nombre} - {m.especialidad}
          </a>

          <p>ID: {m.id}</p>

          <button onClick={() => borrar(m.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}