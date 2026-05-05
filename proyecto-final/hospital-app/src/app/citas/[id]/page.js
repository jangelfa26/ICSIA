"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleCita() {
  const { id } = useParams();

  const [cita, setCita] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const [resCitas, resPacientes, resMedicos] = await Promise.all([
          fetch("/api/citas"),
          fetch("/api/pacientes"),
          fetch("/api/medicos"),
        ]);

        const citas = await resCitas.json();
        const pacientes = await resPacientes.json();
        const medicos = await resMedicos.json();

        const c = citas.find(x => x.id == id);
        setCita(c);

        if (c) {
          setPaciente(pacientes.find(p => p.id == c.id_paciente));
          setMedico(medicos.find(m => m.id == c.id_medico));
        }
      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  if (!cita) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h1>Detalle cita</h1>

      <p><b>Motivo:</b> {cita.motivo}</p>
      <p><b>Estado:</b> {cita.estado}</p>
      <p><b>Fecha:</b> {new Date(cita.fecha).toLocaleString()}</p>

      {paciente && (
        <p>
          <b>Paciente:</b>{" "}
          <a href={`/pacientes/${paciente.id}`}>
            {paciente.nombre}
          </a>
        </p>
      )}

      {medico && (
        <p>
          <b>Médico:</b>{" "}
          <a href={`/medicos/${medico.id}`}>
            {medico.nombre}
          </a>
        </p>
      )}

      <a href={`/citas/${cita.id}/editar`}>Editar</a>
    </div>
  );
}