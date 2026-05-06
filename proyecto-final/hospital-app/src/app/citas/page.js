"use client";
import { useEffect, useState } from "react";

export default function Citas() {
  const [data, setData] = useState([]);
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [pacientes, setPacientes] = useState([]);

  const cargar = async () => {
    try {
      const [resCitas, resPacientes] = await Promise.all([
        fetch("/api/citas"),
        fetch("/api/pacientes"),
      ]);

      const citas = await resCitas.json();
      const pacientesData = await resPacientes.json();

      setData(citas);
      setPacientes(pacientesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {
    if (!confirm("¿Eliminar cita?")) return;

    await fetch(`/api/citas/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const getPaciente = (id) => {
    const p = pacientes.find(x => x.id == id);
    return p ? `${p.nombre}` : `Paciente ${id}`;
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case "Programada":
        return "#3b82f6"; // azul
      case "Completada":
        return "#22c55e"; // verde
      case "Cancelada":
        return "#ef4444"; // rojo
      default:
        return "#999";
    }
  };

  const filtradas = data.filter(c =>
    (!estado || c.estado === estado) &&
    (!fecha || c.fecha?.startsWith(fecha))
  );

  const formatearFecha = (f) =>
    new Date(f).toLocaleDateString();

  return (
    <div className="container">
      <h1>Citas</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select onChange={e => setEstado(e.target.value)}>
          <option value="">Estado</option>
          <option>Programada</option>
          <option>Completada</option>
          <option>Cancelada</option>
        </select>

        <input
          type="date"
          onChange={e => setFecha(e.target.value)}
        />

        <a href="/citas/nuevo">
          <button>Nueva cita</button>
        </a>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20
      }}>
        {filtradas.map(c => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{
                background: getColorEstado(c.estado),
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 12
              }}>
                {c.estado}
              </span>

              <span style={{ fontSize: 12, color: "#000000" }}>
                {formatearFecha(c.fecha)}
              </span>
            </div>

            <h3 style={{ marginTop: 10, color: "#000000" }}>{c.motivo}</h3>

            <p style={{ color: "#555" }}>
              Paciente: <b>{getPaciente(c.id_paciente)}</b>
            </p>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10
            }}>
              <a href={`/citas/${c.id}`}>Ver</a>

              <div>

                <button onClick={() => window.location.href = `/citas/${c.id}/editar`}>
                  ✏️
                </button>

                <button
                  onClick={() => borrar(c.id)}
                  style={{
                    marginLeft: 10,
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}