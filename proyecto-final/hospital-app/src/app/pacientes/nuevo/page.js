"use client";
import { useState } from "react";

export default function NuevoPaciente() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const crear = async () => {
    if (!nombre) return alert("Nombre requerido");

    await fetch("/api/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    });

    window.location.href = "/pacientes";
  };

  return (
    <div className="container">
      <h1>Nuevo paciente</h1>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={crear}>Guardar</button>
    </div>
  );
}