"use client";
import { useState } from "react";

export default function NuevoHistorial() {
  const [diagnostico, setDiagnostico] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [id_paciente, setIdPaciente] = useState("");

  const crear = async () => {
    if (!diagnostico || !id_paciente) {
      return alert("Faltan datos");
    }

    await fetch("/api/historial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        diagnostico,
        observaciones,
        id_paciente
      }),
    });

    window.location.href = "/historial";
  };

  return (
    <div className="container">
      <h1>Nuevo historial</h1>

      <input
        placeholder="Paciente ID"
        onChange={e => setIdPaciente(e.target.value)}
      />

      <input
        placeholder="Diagnóstico"
        onChange={e => setDiagnostico(e.target.value)}
      />

      <textarea
        placeholder="Observaciones"
        onChange={e => setObservaciones(e.target.value)}
      />

      <button onClick={crear}>Guardar</button>
    </div>
  );
}