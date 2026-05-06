"use client";
import { useState } from "react";

export default function NuevoPaciente() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const emailValido = validarEmail(email) || email === "";

  const crear = async () => {
    if (!nombre || !apellido) {
      return alert("Nombre y apellido requeridos");
    }

    if (email && !validarEmail(email)) {
      return alert("Email inválido");
    }

    await fetch("/api/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellido, email }),
    });

    window.location.href = "/pacientes";
  };

  return (
    <div className="container">
      <h1>Nuevo paciente</h1>

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Nombre"
        onChange={e => setNombre(e.target.value)}
      />
      <br></br>
      <label htmlFor="apellido">Apellido</label>
      <input
        id="apellido"
        name="apellido"
        type="text"
        placeholder="Apellido"
        onChange={e => setApellido(e.target.value)}
      />
      <br></br>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {!emailValido && (
        <p className="error">Email inválido</p>
      )}

      <button onClick={crear}>Guardar</button>
    </div>
  );
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}