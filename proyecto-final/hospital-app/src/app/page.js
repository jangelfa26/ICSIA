"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {

    const cargar = async () => {

      try {

        const [
          pacientesRes,
          medicosRes,
          citasRes,
          consultasRes,
          medicamentosRes,
          historialRes
        ] = await Promise.all([
          fetch("/api/pacientes"),
          fetch("/api/medicos"),
          fetch("/api/citas"),
          fetch("/api/consultas"),
          fetch("/api/medicamentos"),
          fetch("/api/historial")
        ]);

        const pacientesData = await pacientesRes.json();
        const medicosData = await medicosRes.json();
        const citasData = await citasRes.json();
        const consultasData = await consultasRes.json();
        const medicamentosData = await medicamentosRes.json();
        const historialData = await historialRes.json();

        setPacientes(pacientesData);
        setMedicos(medicosData);
        setCitas(citasData);
        setConsultas(consultasData);
        setMedicamentos(medicamentosData);
        setHistorial(historialData);

      } catch (err) {
        console.error(err);
      }
    };

    cargar();

  }, []);

  const hoy = new Date().toISOString().slice(0, 10);

  const citasHoy = citas.filter(c =>
    c.fecha?.startsWith(hoy)
  );

  const pendientes = citas.filter(c =>
    c.estado === "Programada"
  );

  const consultasOcupadas = consultas.filter(c =>
    c.estado === "Asignada"
  );

  const consultasMantenimiento = consultas.filter(c =>
    c.estado === "Mantenimiento"
  );

  const stockBajo = medicamentos.filter(m =>
    Number(m.stock) > 0 &&
    Number(m.stock) <= 5
  );
  const ahora = new Date();

  const proximasCitas = citas
    .filter(c =>
      c.estado === "Programada" &&
      new Date(c.fecha) > ahora
    )
    .sort((a, b) =>
      new Date(a.fecha) - new Date(b.fecha)
    )
    .slice(0, 5);

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>
          <h1>Dashboard Hospitalario</h1>
          <p>
            Resumen general del sistema hospitalario
          </p>
        </div>

        <div className="dashboard-actions">

          <a href="/citas/nuevo" className="quick-btn">
            + Nueva cita
          </a>

          <a href="/pacientes/nuevo" className="quick-btn">
            + Nuevo paciente
          </a>

          <a href="/historial/nuevo" className="quick-btn">
            + Historial
          </a>

        </div>

      </div>


      <div className="dashboard-grid">

        <div className="dashboard-card">
          <span>👥 Pacientes</span>
          <h2>{pacientes.length}</h2>
        </div>

        <div className="dashboard-card">
          <span>👨‍⚕️ Médicos</span>
          <h2>{medicos.length}</h2>
        </div>

        <div className="dashboard-card">
          <span>📅 Citas hoy</span>
          <h2>{citasHoy.length}</h2>
        </div>

        <div className="dashboard-card">
          <span>⏳ Pendientes</span>
          <h2>{pendientes.length}</h2>
        </div>

        <div className="dashboard-card">
          <span>🏥 Consultas ocupadas</span>
          <h2>{consultasOcupadas.length}</h2>
        </div>

        <div className="dashboard-card warning">
          <span>💊 Stock bajo</span>
          <h2>{stockBajo.length}</h2>
        </div>

      </div>

      <div className="dashboard-section">

        <h2>Alertas del sistema</h2>

        <div className="alert-grid">

          {stockBajo.length > 0 && (
            <div className="alert-card danger">
              ⚠️ Hay {stockBajo.length} medicamentos con stock bajo
            </div>
          )}

          {consultasMantenimiento.length > 0 && (
            <div className="alert-card warning">
              🏥 {consultasMantenimiento.length} consultas en mantenimiento
            </div>
          )}

          {pendientes.length > 5 && (
            <div className="alert-card info">
              📅 Alto volumen de citas pendientes
            </div>
          )}

        </div>

      </div>


      <div className="dashboard-content">

        <div className="dashboard-panel">

          <div className="panel-header">
            <h2>Próximas citas</h2>
            <a href="/citas">Ver todas</a>
          </div>

          {proximasCitas.map(c => (

            <div key={c.id} className="activity-item">

              <div>
                <strong>{c.motivo}</strong>

                <p>
                  {new Date(c.fecha).toLocaleString()}
                </p>
              </div>

              <span className={`estado ${c.estado?.toLowerCase()}`}>
                {c.estado}
              </span>

            </div>

          ))}

        </div>

        <div className="dashboard-panel">

          <div className="panel-header">
            <h2>Estado consultas</h2>
            <a href="/consultas">Gestionar</a>
          </div>

          {consultas.slice(0, 6).map(c => (

            <div key={c.id} className="consulta-item">

              <div>
                <strong>{c.nombre}</strong>
                <p>{c.codigo}</p>
              </div>

              <span className={`consulta-badge ${c.estado?.toLowerCase()}`}>
                {c.estado}
              </span>

            </div>

          ))}

        </div>

      </div>


      <div className="dashboard-panel historial-panel">

        <div className="panel-header">
          <h2>Últimos historiales clínicos</h2>
          <a href="/historial">Ver historial</a>
        </div>

        {historial.slice(0, 5).map(h => (

          <div key={h._id} className="historial-item">

            <div>
              <strong>{h.diagnostico}</strong>

              <p>
                {new Date(h.fecha).toLocaleDateString()}
              </p>
            </div>

            <a href={`/historial/${h._id}`}>
              Ver detalle
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}