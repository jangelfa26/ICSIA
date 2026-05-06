"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarMedico() {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const res = await fetch(`/api/medicos/${id}`);

        if (!res.ok) throw new Error("Error cargando médico");

        const data = await res.json();

        setNombre(data.nombre || "");
        setEspecialidad(data.especialidad || "");
        setFoto(data.foto || "");

      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    await fetch(`/api/medicos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, especialidad, foto }),
    });

    window.location.href = "/medicos";
  };

  return (
    <div className="container">
      <h1>Editar médico</h1>

      <label>Nombre</label>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />

      <label>Especialidad</label>
      <input value={especialidad} onChange={e => setEspecialidad(e.target.value)} />

      <label>Foto (URL)</label>
      <input value={foto} onChange={e => setFoto(e.target.value)} />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}