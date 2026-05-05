"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarPaciente() {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      const res = await fetch("/api/pacientes");
      const data = await res.json();

      const p = data.find(x => x.id == id);
      if (p) {
        setNombre(p.nombre || "");
        setApellido(p.apellido || "");
        setEmail(p.email || "");
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    await fetch(`/api/pacientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email
      }),
    });

    window.location.href = "/pacientes";
  };

  return (
    <div className="container">
      <h1>Editar paciente</h1>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        placeholder="Apellido"
        value={apellido}
        onChange={e => setApellido(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}