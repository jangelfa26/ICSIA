"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleMedico() {
  const { id } = useParams();

  const [medico, setMedico] = useState(null);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const [resMedicos, resCitas] = await Promise.all([
          fetch("/api/medicos"),
          fetch("/api/citas"),
        ]);

        const medicos = await resMedicos.json();
        const citasData = await resCitas.json();

        const m = medicos.find(x => x.id == id);
        setMedico(m);

        setCitas(citasData.filter(c => c.id_medico == id));
      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  if (!medico) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h1>{medico.nombre}</h1>
      <p>Especialidad: {medico.especialidad}</p>

      <a href={`/medicos/${medico.id}/editar`}>Editar</a>

      <h2>Citas asignadas</h2>
      {citas.length === 0 && <p>No hay citas</p>}

      {citas.map(c => (
        <div key={c.id}>
          <a href={`/citas/${c.id}`}>{c.motivo}</a>
        </div>
      ))}
    </div>
  );
}