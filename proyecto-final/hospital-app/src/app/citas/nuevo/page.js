"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaCita() {
  const router = useRouter();
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [id_paciente, setIdPaciente] = useState("");
  const [id_medico, setIdMedico] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const [pRes, mRes] = await Promise.all([
          fetch("/api/pacientes"),
          fetch("/api/medicos"),
        ]);

        if (!pRes.ok || !mRes.ok) throw new Error("Error cargando datos");

        setPacientes(await pRes.json());
        setMedicos(await mRes.json());
      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, []);

  const crear = async () => {
    if (!motivo || !fecha || !id_paciente || !id_medico) {
      return alert("Faltan datos");
    }

    try {
      const res = await fetch("/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo,
          fecha: new Date(fecha).toISOString(),
          estado: "Programada",
          id_paciente: Number(id_paciente),
          id_medico: Number(id_medico),
        }),
      });

      if (!res.ok) throw new Error("Error creando cita");

      window.location.href = "/citas";
    } catch (err) {
      console.error(err);
      alert("Error al crear la cita");
    }
  };

  return (
    <div className="container">
      <h1>Nueva cita</h1>
      <label>Motivo</label>
      <input
        placeholder="Motivo"
        value={motivo}
        onChange={e => setMotivo(e.target.value)}
      />
      <br></br>
      <label>Fecha y hora</label>
      <input
        type="datetime-local"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />
      <br></br>
      <label>Paciente</label>
      <select value={id_paciente} onChange={e => setIdPaciente(e.target.value)}>
        <option value="">Paciente</option>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
      <br></br>
      <label>Médico</label>
      <select value={id_medico} onChange={e => setIdMedico(e.target.value)}>
        <option value="">Médico</option>
        {medicos.map(m => (
          <option key={m.id} value={m.id}>
            {m.nombre} - {m.especialidad}
          </option>
        ))}
      </select>
      <br></br>
      <div className="form-actions">

        <button onClick={crear}>
          Crear
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