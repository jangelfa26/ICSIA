"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarHistorial() {
  const params = useParams();

  const [diagnostico, setDiagnostico] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    fetch("/api/historial")
      .then(r => r.json())
      .then(data => {
        const h = data.find(x => x._id === params.id);

        if (h) {
          setDiagnostico(h.diagnostico || "");
          setObservaciones(h.observaciones || "");
        }
      });
  }, [params.id]);

  const guardar = async () => {
    await fetch(`/api/historial/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diagnostico,
        observaciones
      }),
    });

    window.location.href = "/historial";
  };

  return (
    <div className="container">
      <h1>Editar historial</h1>

      <input
        value={diagnostico}
        onChange={e => setDiagnostico(e.target.value)}
      />

      <textarea
        value={observaciones}
        onChange={e => setObservaciones(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}