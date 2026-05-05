"use client";
import { useEffect, useState } from "react";

export default function Citas() {
  const [data, setData] = useState([]);
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  const cargar = async () => {
    try {
      const res = await fetch("/api/citas");
      if (!res.ok) throw new Error("Error cargando citas");

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
    if (!confirm("¿Eliminar cita?")) return;

    await fetch(`/api/citas/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const filtradas = data.filter(c =>
    (!estado || c.estado === estado) &&
    (!fecha || c.fecha?.startsWith(fecha))
  );

  return (
    <div className="container">
      <h1>Citas</h1>

      <a href="/citas/nuevo">Nueva cita</a>

      <div>
        <select onChange={e => setEstado(e.target.value)}>
          <option value="">Estado</option>
          <option>Programada</option>
          <option>Completada</option>
          <option>Cancelada</option>
        </select>

        <input type="date" onChange={e => setFecha(e.target.value)} />
      </div>

      {filtradas.map(c => (
        <div key={c.id} className="card">
          <p><b>{c.motivo}</b></p>
          <p>Estado: {c.estado}</p>
          <p>Fecha: {new Date(c.fecha).toLocaleString()}</p>
          <p>Paciente ID: {c.id_paciente}</p>
          <p>Médico ID: {c.id_medico || "—"}</p>

          <button onClick={() => borrar(c.id)}>Eliminar</button>
          <a href={`/citas/${c.id}`}>Ver</a>
          <a href={`/citas/${c.id}/editar`}>Editar</a>
        </div>
      ))}
    </div>
  );
}