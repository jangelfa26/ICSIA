"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleHistorial() {
  const params = useParams();

  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    fetch("/api/historial")
      .then(r => r.json())
      .then(data => {
        const h = data.find(x => x._id === params.id);
        setHistorial(h);
      });
  }, [params.id]);

  if (!historial) return "Cargando...";

  return (
    <div className="container">
      <h1>Detalle historial clínico</h1>

      <p><b>Diagnóstico:</b> {historial.diagnostico}</p>

      {historial.observaciones && (
        <p><b>Observaciones:</b> {historial.observaciones}</p>
      )}

      <p><b>Paciente ID:</b> {historial.id_paciente}</p>

      {historial.fecha && (
        <p>
          <b>Fecha:</b>{" "}
          {new Date(historial.fecha).toLocaleString()}
        </p>
      )}

      <a href={`/historial/editar/${historial._id}`}>
        Editar
      </a>
    </div>
  );
}