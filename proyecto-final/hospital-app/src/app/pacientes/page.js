"use client";
import { useEffect, useState } from "react";

export default function Pacientes() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");

  const cargar = async () => {
    try {
      const res = await fetch("/api/pacientes");
      if (!res.ok) throw new Error("Error cargando pacientes");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {
    if (!confirm("¿Eliminar paciente?")) return;

    try {
      const res = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando");

      cargar();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  let filtrados = data.filter(p => {
    const texto = busqueda.toLowerCase();
    const nombre = (p.nombre || "").toLowerCase();
    const apellido = (p.apellido || "").toLowerCase();

    return (
      nombre.includes(texto) ||
      apellido.includes(texto) ||
      `${nombre} ${apellido}`.includes(texto)
    );
  });

  filtrados = [...filtrados].sort((a, b) => {
    switch (orden) {
      case "nombre_asc":
        return a.nombre.localeCompare(b.nombre);

      case "nombre_desc":
        return b.nombre.localeCompare(a.nombre);

      case "apellido_asc":
        return (a.apellido || "").localeCompare(b.apellido || "");

      case "apellido_desc":
        return (b.apellido || "").localeCompare(a.apellido || "");

      case "id_asc":
        return a.id - b.id;

      case "id_desc":
        return b.id - a.id;

      default:
        return 0;
    }
  });

  return (
    <div className="container">
      <h1>Pacientes</h1>

      <button onClick={() => window.location.href = "/pacientes/nuevo"}>
        + Nuevo paciente
      </button>
      <br></br>
      <div className="filtros">
        <input
          placeholder="Buscar..."
          onChange={e => setBusqueda(e.target.value)}
        />

        <select onChange={e => setOrden(e.target.value)}>
          <option value="">Ordenar</option>
          <option value="nombre_asc">Nombre A-Z</option>
          <option value="nombre_desc">Nombre Z-A</option>
          <option value="apellido_asc">Apellido A-Z</option>
          <option value="apellido_desc">Apellido Z-A</option>
          <option value="id_desc">Más recientes</option>
          <option value="id_asc">Más antiguos</option>
        </select>
      </div>

      {filtrados.map(p => (
        <div key={p.id} className="card">
          <h3>{p.nombre} {p.apellido}</h3>
          <p>Email: {p.email || "—"}</p>
          <p>ID: {p.id}</p>

          <div className="acciones">
            <button onClick={() => window.location.href = `/pacientes/${p.id}`}>
              Ver
            </button>
            
            <button onClick={() => window.location.href = `/pacientes/${p.id}/editar`}>
              Editar
            </button>
            <button onClick={() => borrar(p.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}