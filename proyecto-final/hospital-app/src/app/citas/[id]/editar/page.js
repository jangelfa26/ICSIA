"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarCita() {
  const { id } = useParams();

  const [motivo, setMotivo] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const res = await fetch("/api/citas");
        const data = await res.json();

        const c = data.find(x => x.id == id);
        if (c) {
          setMotivo(c.motivo);
          setEstado(c.estado);
          setFecha(c.fecha?.slice(0, 16)); // para datetime-local
        }
      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    await fetch(`/api/citas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ motivo, estado, fecha }),
    });

    window.location.href = "/citas";
  };

  return (
    <div className="container">
      <h1>Editar cita</h1>

      <input
        value={motivo}
        onChange={e => setMotivo(e.target.value)}
      />

      <input
        type="datetime-local"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
      >
        <option>Programada</option>
        <option>Completada</option>
        <option>Cancelada</option>
      </select>

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}