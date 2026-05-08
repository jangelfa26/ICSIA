"use client";
import { useEffect, useState } from "react";

export default function Historial() {
  const [data, setData] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [medicamentoFiltro, setMedicamentoFiltro] = useState("");
  const [orden, setOrden] = useState("fecha_desc");

  const cargar = async () => {
    try {
      const [historialRes, pacientesRes] = await Promise.all([
        fetch("/api/historial"),
        fetch("/api/pacientes"),
      ]);

      const historialData = await historialRes.json();
      const pacientesData = await pacientesRes.json();

      setData(historialData);
      setPacientes(pacientesData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const borrar = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;

    await fetch(`/api/historial/${id}`, {
      method: "DELETE",
    });

    cargar();
  };

  const getPaciente = (id) => {
    const paciente = pacientes.find(
      p => Number(p.id) === Number(id)
    );

    if (!paciente) return `Paciente ${id}`;

    return `${paciente.nombre} ${paciente.apellido || ""}`;
  };

  const filtrados = data
    .filter(h => {

      const coincideBusqueda =
        (h.diagnostico ?? "")
          .toLowerCase()
          .includes(busqueda.toLowerCase());

      const coincideMedicamento =
        !medicamentoFiltro ||
        (h.receta || []).some(r =>
          r.nombre === medicamentoFiltro
        );

      return coincideBusqueda && coincideMedicamento;
    })
    .sort((a, b) => {

      switch (orden) {

        case "fecha_asc":
          return new Date(a.fecha) - new Date(b.fecha);

        case "fecha_desc":
          return new Date(b.fecha) - new Date(a.fecha);

        case "nombre_asc":
          return (a.diagnostico || "")
            .localeCompare(b.diagnostico || "");

        case "nombre_desc":
          return (b.diagnostico || "")
            .localeCompare(a.diagnostico || "");

        default:
          return 0;
      }
    });

  const medicamentosUnicos = [
    ...new Set(
      data.flatMap(h =>
        (h.receta || []).map(r => r.nombre)
      )
    )
  ];

  return (
    <div className="historial-container">

      <div className="historial-header">
        <div>
          <h1>Historial Clínico</h1>
          <p>Gestión de diagnósticos y recetas médicas</p>
        </div>

        <a href="/historial/nuevo">
          <button className="btn-nuevo">
            + Nuevo Historial
          </button>
        </a>
      </div>

      <div className="historial-filtros">

        <input
          placeholder="Buscar diagnóstico"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        <select
          value={medicamentoFiltro}
          onChange={e => setMedicamentoFiltro(e.target.value)}
        >
          <option value="">
            Todos los medicamentos
          </option>

          {medicamentosUnicos.map(nombre => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>

        <select
          value={orden}
          onChange={e => setOrden(e.target.value)}
        >
          <option value="fecha_desc">
            Fecha más nueva
          </option>

          <option value="fecha_asc">
            Fecha más antigua
          </option>

          <option value="nombre_asc">
            Diagnóstico A-Z
          </option>

          <option value="nombre_desc">
            Diagnóstico Z-A
          </option>
        </select>

      </div>

      <div className="historial-tabla">

        <div className="tabla-header">
          <div>Paciente</div>
          <div>Diagnóstico</div>
          <div>Fecha</div>
          <div>Receta</div>
          <div>Acciones</div>
        </div>

        {filtrados.map(h => (
          <div key={h._id} className="tabla-row">

            <div>
              <strong>
                {getPaciente(h.id_paciente)}
              </strong>
            </div>

            <div>
              {h.diagnostico}
            </div>

            <div>
              {new Date(h.fecha).toLocaleDateString()}
            </div>

            <div>
              {h.receta?.length > 0 ? (
                h.receta.map((r, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "10px" }}
                  >
                    <a
                      href={`/medicamentos/${r.id_medicamento}`}
                    >
                      {r.nombre}
                    </a>

                    <div style={{ fontSize: "14px" }}>
                      {r.dosis}
                    </div>

                    <div style={{ fontSize: "13px", color: "#555" }}>
                      {r.frecuencia}
                    </div>

                    <div style={{ fontSize: "13px", color: "#555" }}>
                      {r.duracion}
                    </div>
                  </div>
                ))
              ) : (
                <span>Sin receta</span>
              )}
            </div>

            <div className="acciones">
              <button className="btn-accion" onClick={() => window.location.href = `/historial/${h._id}`}>
                👁️
              </button>

              <button className="btn-accion" onClick={() => window.location.href = `/historial/${h._id}/editar`}>
                ✏️
              </button>

              <button onClick={() => borrar(h._id)}>
                🗑️
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}