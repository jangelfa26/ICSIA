"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleHistorial() {
  const params = useParams();

  const [historial, setHistorial] = useState(null);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {

    const cargar = async () => {
      try {

        const [historialRes, pacientesRes] = await Promise.all([
          fetch("/api/historial"),
          fetch("/api/pacientes"),
        ]);

        const historialData = await historialRes.json();
        const pacientesData = await pacientesRes.json();

        const h = historialData.find(
          x => x._id === params.id
        );

        setHistorial(h);

        if (h) {
          const pacienteEncontrado = pacientesData.find(
            p => Number(p.id) === Number(h.id_paciente)
          );

          setPaciente(pacienteEncontrado);
        }

      } catch (error) {
        console.error(error);
      }
    };

    cargar();

  }, [params.id]);

  if (!historial) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="detalle-historial">

      <div className="detalle-card">

        <div className="detalle-top">
          <div>
            <h1>{historial.diagnostico}</h1>

            <p>
              {new Date(historial.fecha).toLocaleString()}
            </p>
          </div>

          <a href={`/historial/${historial._id}/editar`}>
            <button>Editar</button>
          </a>
        </div>

        <div className="detalle-section">
          <h3>Paciente</h3>

          {paciente ? (
            <a href={`/pacientes/${paciente.id}`}>
              {paciente.nombre} {paciente.apellido}
            </a>
          ) : (
            <span>Paciente #{historial.id_paciente}</span>
          )}
        </div>

        <div className="detalle-section">
          <h3>Observaciones</h3>

          <p>
            {historial.observaciones || "Sin observaciones"}
          </p>
        </div>

        <div className="detalle-section">
          <h3>Receta</h3>

          {historial.receta?.length > 0 ? (
            historial.receta.map((r, index) => (
              <div
                key={index}
                className="medicamento-card"
              >
                <a href={`/medicamentos/${r.id_medicamento}`}>
                  <strong>{r.nombre}</strong>
                </a>

                <p>Dosis: {r.dosis}</p>
                <p>Frecuencia: {r.frecuencia}</p>
                <p>Duración: {r.duracion}</p>
              </div>
            ))
          ) : (
            <p>Sin medicamentos</p>
          )}

        </div>

      </div>
    </div>
  );
}