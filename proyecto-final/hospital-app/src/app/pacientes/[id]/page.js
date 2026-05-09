"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function DetallePaciente() {

  const { id } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    if (!id) return;

    const cargar = async () => {

      try {

        const [
          resPacientes,
          resCitas,
          resHistorial
        ] = await Promise.all([
          fetch("/api/pacientes"),
          fetch("/api/citas"),
          fetch("/api/historial"),
        ]);

        const pacientes = await resPacientes.json();
        const citasData = await resCitas.json();
        const historialData = await resHistorial.json();

        const p = pacientes.find(
          x => x.id == id
        );

        setPaciente(p || undefined);

        setCitas(
          citasData.filter(
            c => c.id_paciente == id
          )
        );

        setHistorial(
          historialData.filter(
            h => h.id_paciente == id
          )
        );

      } catch (err) {

        console.error(err);

        setPaciente(undefined);

      } finally {

        setCargando(false);
      }
    };

    cargar();

  }, [id]);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (paciente === undefined) {
    notFound();
  }


  return (
    <div className="container">
      <h1>{paciente.nombre} {paciente.apellido}</h1>
      <p>ID: {paciente.id}</p>
      <p>Email: {paciente.email}</p>

      <a href={`/pacientes/${paciente.id}/editar`}>Editar</a>

      <h2>Citas</h2>
      {citas.length === 0 && <p>No hay citas</p>}
      {citas.map(c => (
        <div key={c.id} className="card">
          <p><b>{c.motivo}</b></p>
          <p>Estado: {c.estado}</p>
          <p>Fecha: {new Date(c.fecha).toLocaleString()}</p>
          <a href={`/citas/${c.id}`}>Ver detalle</a>
        </div>
      ))}

      <h2>Historial</h2>
      {historial.length === 0 && <p>Sin historial</p>}
      {historial.map(h => (
        <div key={h._id} className="card">
          <p><b>{h.diagnostico}</b></p>
          <p>{h.observaciones}</p>
        </div>
      ))}

      <a href={`/historial`}>
        Ver historial completo
      </a>
    </div>
  );
}