"use client";
import { useEffect, useState } from "react";

export default function Consultas() {
    const [data, setData] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const cargar = async () => {
        try {
            const [cRes, mRes] = await Promise.all([
                fetch("/api/consultas"),
                fetch("/api/medicos"),
            ]);

            const consultas = await cRes.json();
            const medicosData = await mRes.json();

            setData(consultas);
            setMedicos(medicosData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        cargar();
    }, []);

    const actualizar = async (id, cambios) => {
        await fetch(`/api/consultas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambios),
        });

        cargar();
    };

const getMedicoNombre = (id) => {
  const m = medicos.find(x => x.id == id);
  return m ? m.nombre : "—";
};

    const colorEstado = (estado) => {
        switch (estado) {
            case "Disponible": return "#22c55e";
            case "Asignada": return "#eab308";
            case "Mantenimiento": return "#ef4444";
            default: return "#999";
        }
    };

    return (
        <div className="container">
            <h1>Consultas</h1>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Asignación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(c => (
                        <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>

                            <td>#{c.id}</td>

                            <td>
                                <span style={{
                                    background: "#000",
                                    padding: "3px 8px",
                                    borderRadius: 5,
                                    fontSize: 12
                                }}>
                                    {c.codigo}
                                </span>
                            </td>

                            <td>{c.nombre}</td>

                            <td>{c.categoria}</td>

                            <td>
                                <select
                                    value={c.estado}
                                    onChange={(e) => {
                                        const nuevoEstado = e.target.value;

                                        if (nuevoEstado === "Asignada" && !c.id_medico) {
                                            alert("Debes asignar un médico antes");
                                            return;
                                        }

                                        actualizar(c.id, { estado: nuevoEstado });
                                    }}
                                    style={{
                                        background: colorEstado(c.estado),
                                        color: "#fff",
                                        borderRadius: 10,
                                        padding: "5px"
                                    }}
                                >
                                    <option>Disponible</option>
                                    <option disabled={!c.id_medico}>Asignada</option>
                                    <option>Mantenimiento</option>
                                </select>


                                {c.estado === "Asignada" && c.id_medico && (
                                    <div style={{ fontSize: 12, marginTop: 5 }}>
                                        👨‍⚕️{" "}
                                        <a href={`/medicos/${c.id_medico}`}>
                                            {getMedicoNombre(c.id_medico)}
                                        </a>
                                    </div>
                                )}
                            </td>

                            <td>
                                {c.estado === "Disponible" && (
                                    <select
                                        defaultValue=""
                                        onChange={(e) => {
                                            const medicoId = Number(e.target.value);

                                            if (!medicoId) return;

                                            actualizar(c.id, {
                                                id_medico: medicoId,
                                                estado: "Asignada"
                                            });
                                        }}
                                    >
                                        <option value="">Asignar médico</option>
                                        {medicos.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.nombre}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {c.estado === "Asignada" && (
                                    <button
                                        onClick={() =>
                                            actualizar(c.id, {
                                                id_medico: null,
                                                estado: "Disponible"
                                            })
                                        }
                                    >
                                        ❌ Desasignar
                                    </button>
                                )}

                                {c.estado === "Mantenimiento" && (
                                    <button
                                        onClick={() =>
                                            actualizar(c.id, { estado: "Disponible" })
                                        }
                                    >
                                        🟢 Abrir
                                    </button>
                                )}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        window.location.href = `/consultas/${c.id}/editar`
                                    }
                                >
                                    ✏️
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}