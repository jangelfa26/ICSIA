"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarPaciente() {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const emailValido = validarEmail(email) || email === "";

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const res = await fetch("/api/pacientes");
        const data = await res.json();

        const p = data.find(x => x.id == id);
        if (p) {
          setNombre(p.nombre);
          setApellido(p.apellido || "");
          setEmail(p.email || "");
        }
      } catch (err) {
        console.error("Error cargando paciente:", err);
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    if (!nombre || !apellido) {
      return alert("Nombre y apellido son obligatorios");
    }

    if (email && !validarEmail(email)) {
      return alert("Email inválido");
    }

    try {
      await fetch(`/api/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email }),
      });

      window.location.href = "/pacientes";
    } catch (err) {
      console.error("Error actualizando:", err);
      alert("Error al guardar");
    }
  };

  return (
    <div className="container">
      <h1>Editar paciente</h1>

      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {!emailValido && (
          <p className="error">Email inválido</p>
        )}
      </div>

      <button onClick={guardar} disabled={!emailValido}>
        Guardar
      </button>
    </div>
  );
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}