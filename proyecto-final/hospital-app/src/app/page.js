"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pacientes, setPacientes] = useState(0);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetch("/api/pacientes")
      .then(r => r.json())
      .then(d => setPacientes(d.length));

    fetch("/api/citas")
      .then(r => r.json())
      .then(setCitas);
  }, []);

  const hoy = new Date().toISOString().slice(0, 10);

  const citasHoy = citas.filter(c =>
    c.fecha?.startsWith(hoy)
  ).length;

  const pendientes = citas.filter(c =>
    c.estado === "Programada"
  ).length;

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">Pacientes: {pacientes}</div>
      <div className="card">Citas hoy: {citasHoy}</div>
      <div className="card">Pendientes: {pendientes}</div>
    </div>
  );
}