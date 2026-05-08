"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarCita() {
  const { id } = useParams();
  const router = useRouter();
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
      const [cRes, pRes, mRes] = await Promise.all([
        fetch("/api/citas"),
        fetch("/api/pacientes"),
        fetch("/api/medicos")
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
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    if (!motivo || !fecha || !id_paciente || !id_medico) {
      alert("Todos los campos son obligatorios (incluye hora)");
      return;
    }

    const res = await fetch(`/api/citas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        motivo,
        estado,
        fecha,
        id_paciente: Number(id_paciente),
        id_medico: Number(id_medico)
      }),
    });

    if (!res.ok) {
      alert("Error al guardar");
      return;
    }

    window.location.href = "/citas";
  };

  return (
    <div className="container">
      <h1>Editar cita</h1>
      <br></br>
      <label>Motivo</label>
      <input value={motivo} onChange={e => setMotivo(e.target.value)} />
      <br></br>
      <label>Fecha y hora</label>
      <input
        type="datetime-local"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />
      <br></br>
      <label>Estado</label>
      <select value={estado} onChange={e => setEstado(e.target.value)}>
        <option>Programada</option>
        <option>Completada</option>
        <option>Cancelada</option>
      </select>
      <br></br>
      <label>Paciente</label>
      <select value={id_paciente} onChange={e => setIdPaciente(e.target.value)}>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
      <br></br>
      <label>Médico</label>
      <select value={id_medico} onChange={e => setIdMedico(e.target.value)}>
        {medicos.map(m => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>
      <br></br>
      <div className="form-actions">

        <button onClick={guardar}>
          Guardar
        </button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => router.push("/citas")}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}