"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function DetalleMedico() {
  const { id } = useParams();

  const [medico, setMedico] = useState(null);
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const [resMedico, resCitas, resPacientes] = await Promise.all([
          fetch(`/api/medicos/${id}`),
          fetch("/api/citas"),
          fetch("/api/pacientes"),
        ]);

        const medicoData = await resMedico.json();
        const citasData = await resCitas.json();
        const pacientesData = await resPacientes.json();

        setMedico(medicoData);
        setPacientes(pacientesData);

        const citasFiltradas = citasData.filter(
          c => c.id_medico == id
        );

        setCitas(citasFiltradas);
      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  if (!medico) {
    notFound();
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString();
  };

  const getPaciente = (idPaciente) => {
    const p = pacientes.find(x => x.id == idPaciente);
    return p ? `${p.id} - ${p.nombre}` : `ID ${idPaciente}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <div style={{
        width: "800px",
        padding: 25,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <a href="/medicos">← Volver a médicos</a>


        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <img
            src={medico.foto || "https://via.placeholder.com/100"}
            alt="foto"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />

          <div>
            <h2>{medico.nombre}</h2>
            <p>{medico.especialidad}</p>
            <p><b>Email:</b> {medico.email || "—"}</p>
            <p><b>Fecha de ingreso:</b> {formatearFecha(medico.createdAt)}</p>
          </div>
        </div>

        <h3 style={{ marginTop: 30 }}>Citas asignadas</h3>

        <div style={{ marginTop: 10 }}>
          {citas.map(c => (
            <div
              key={c.id}
              onClick={() => window.location.href = `/citas/${c.id}`}
              className="citasMedico"
              style={{
                padding: "12px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                gap: "10px"
              }}
            >
              <div>
                <b>{c.motivo}</b>
              </div>

              <div>
                {getPaciente(c.id_paciente)}
              </div>

              <div>
                {formatearFecha(c.fecha)}
              </div>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: 20,
            padding: "10px 15px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
          onClick={() => window.location.href = `/medicos/${medico.id}/editar`}
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
}