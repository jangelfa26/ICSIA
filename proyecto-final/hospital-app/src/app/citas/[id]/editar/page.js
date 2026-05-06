"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarCita() {
  const { id } = useParams();

  const [motivo, setMotivo] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [id_paciente, setIdPaciente] = useState("");
  const [id_medico, setIdMedico] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const [cRes, pRes, mRes] = await Promise.all([
          fetch(`/api/citas`),
          fetch(`/api/pacientes`),
          fetch(`/api/medicos`)
        ]);

        const citas = await cRes.json();
        const pacientesData = await pRes.json();
        const medicosData = await mRes.json();

        const c = citas.find(x => x.id == id);

        if (c) {
          setMotivo(c.motivo);
          setEstado(c.estado);
          setFecha(c.fecha?.slice(0, 16));
          setIdPaciente(c.id_paciente);
          setIdMedico(c.id_medico);
        }

        setPacientes(pacientesData);
        setMedicos(medicosData);

      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    try {
      const res = await fetch(`/api/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motivo,
          estado,
          fecha,
          id_paciente,
          id_medico
        }),
      });

      if (!res.ok) throw new Error("Error actualizando");

      window.location.href = "/citas";
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  if (!motivo || !fecha || !id_paciente || !id_medico) {
    return alert("Todos los campos son obligatorios (incluye hora)");
  }
  
  return (
    <div className="container">
      <h1>Editar cita</h1>

      <input value={motivo} onChange={e => setMotivo(e.target.value)} />

      <label>Fecha y hora</label>
      <input
        type="datetime-local"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      {!fecha && <p className="error">Debes indicar fecha y hora</p>}


      <select value={estado} onChange={e => setEstado(e.target.value)}>
        <option>Programada</option>
        <option>Completada</option>
        <option>Cancelada</option>
      </select>

      <select value={id_paciente} onChange={e => setIdPaciente(e.target.value)}>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <select value={id_medico} onChange={e => setIdMedico(e.target.value)}>
        {medicos.map(m => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}