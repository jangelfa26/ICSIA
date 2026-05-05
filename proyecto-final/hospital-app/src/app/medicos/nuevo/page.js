"use client";
import { useState } from "react";

export default function NuevoMedico() {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const crear = async () => {
    if (!nombre || !especialidad) {
      return alert("Faltan datos");
    }

    await fetch("/api/medicos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, especialidad }),
    });

    window.location.href = "/medicos";
  };

  return (
    <div className="container">
      <h1>Nuevo médico</h1>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        placeholder="Especialidad"
        value={especialidad}
        onChange={e => setEspecialidad(e.target.value)}
      />

      <button onClick={crear}>Crear</button>
    </div>
  );
}