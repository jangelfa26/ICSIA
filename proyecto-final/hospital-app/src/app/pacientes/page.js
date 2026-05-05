"use client";
import { useEffect, useState } from "react";

export default function Pacientes() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    try {
      const res = await fetch("/api/pacientes");
      if (!res.ok) throw new Error("Error cargando pacientes");

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
    if (!confirm("¿Eliminar paciente?")) return;

    try {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando");

      cargar();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  const filtrados = data.filter(p => {
    const texto = busqueda.toLowerCase();

    return (
      (p.nombre || "").toLowerCase().includes(texto) ||
      (p.apellido || "").toLowerCase().includes(texto) ||
      `${p.nombre || ""} ${p.apellido || ""}`.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="container">
      <h1>Pacientes</h1>

      <a href="/pacientes/nuevo">Nuevo paciente</a>

      <input
        placeholder="Buscar por nombre o apellido"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {filtrados.map(p => (
        <div key={p.id} className="card">
          <a href={`/pacientes/${p.id}`}>
            {p.nombre} {p.apellido}
          </a>

          <p>Email: {p.email || "—"}</p>
          <p>ID: {p.id}</p>

          <button onClick={() => borrar(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}