"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarMedico() {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const res = await fetch(`/api/medicos${id}`);
        const data = await res.json();

        const m = data.find(x => x.id == id);
        if (m) {
          setNombre(m.nombre);
          setEspecialidad(m.especialidad);
        }
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
      body: JSON.stringify({ nombre, especialidad }),
    });

    window.location.href = "/medicos";
  };

  return (
    <div className="container">
      <h1>Editar médico</h1>

      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        value={especialidad}
        onChange={e => setEspecialidad(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}