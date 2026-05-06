"use client";
import { useEffect, useState } from "react";

export default function Medicos() {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [foto, setFoto] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    try {
      const res = await fetch("/api/medicos");
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

  const crear = async () => {
    if (!nombre || !especialidad) {
      return alert("Faltan datos");
    }

    await fetch("/api/medicos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, especialidad, foto }),
    });

    setNombre("");
    setEspecialidad("");
    setFoto("");
    cargar();
  };

  const borrar = async (id) => {
    if (!confirm("¿Eliminar médico?")) return;

    await fetch(`/api/medicos/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const filtrados = data.filter(m =>
    (m.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.especialidad || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestión de Médicos</h1>
      <p>Administra los médicos y sus datos</p>

      <div style={{ display: "flex", gap: "20px" }}>

        <div className="card" style={{ flex: 1 }}>
          <h2>Nuevo Médico</h2>

          <label>Nombre completo</label><br></br>
          <input
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <br></br>
          <label>Especialidad</label> <br></br>
          <input
            placeholder="Ej: Cardiología"
            value={especialidad}
            onChange={e => setEspecialidad(e.target.value)}
          />
          <br></br>
          <label>URL Foto</label><br></br>
          <input
            placeholder="https://..."
            value={foto}
            onChange={e => setFoto(e.target.value)}
          />
          <br></br>
          <button onClick={crear}>Dar de alta</button>
        </div>


        <div className="card" style={{ flex: 2 }}>
          <h2>Listado de Médicos</h2>

          <input
            placeholder="Buscar médico o especialidad"
            onChange={e => setBusqueda(e.target.value)}
          />
          <br></br>
          <table style={{ width: "100%", marginTop: "10px", textAlign: "center", borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map(m => (
                <tr key={m.id}>
                  <td>
                    <img
                      src={m.foto || "https://via.placeholder.com/40"}
                      alt="foto"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                  </td>

                  <td>
                    <b>{m.nombre}</b>
                  </td>

                  <td>{m.especialidad}</td>

                  <td>
                    <div className="acciones" style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px"
                    }}>
                      <button onClick={() => window.location.href = `/medicos/${m.id}/editar`}>
                        ✏️ Editar
                      </button>
                      <button onClick={() => borrar(m.id)}>🗑️ Eliminar</button>
                    </div>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}