"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarConsulta() {
  const { id } = useParams();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [id_medico, setIdMedico] = useState("");
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    if (!id) return;

    const cargar = async () => {
      try {
        const [cRes, mRes] = await Promise.all([
          fetch("/api/consultas"),
          fetch("/api/medicos"),
        ]);

        const consultas = await cRes.json();
        const medicosData = await mRes.json();

        const c = consultas.find(x => x.id == id);

        if (c) {
          setNombre(c.nombre || "");
          setCodigo(c.codigo || "");
          setCategoria(c.categoria || "");
          setEstado(c.estado || "Disponible");
          setIdMedico(c.id_medico || "");
        }

        setMedicos(medicosData);

      } catch (err) {
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  const guardar = async () => {
    try {
      if (estado === "Asignada" && !id_medico) {
        alert("Debes asignar un médico");
        return;
      }

      const res = await fetch(`/api/consultas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          codigo,
          categoria,
          estado,
          id_medico: id_medico || null
        }),
      });

      if (!res.ok) throw new Error("Error actualizando");

      window.location.href = "/consultas";

    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <div className="container">
      <h1>Editar consulta</h1>

      <label>Nombre</label>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />

      <label>Código</label>
      <input value={codigo} onChange={e => setCodigo(e.target.value)} />

      <label>Categoría</label>
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="">Seleccionar</option>
        <option>General</option>
        <option>Pediatría</option>
        <option>Urgencias</option>
        <option>Especialista</option>
      </select>

      <label>Estado</label>
      <select value={estado} onChange={e => setEstado(e.target.value)}>
        <option>Disponible</option>
        <option>Asignada</option>
        <option>Mantenimiento</option>
      </select>

      {estado === "Asignada" && (
        <>
          <label>Médico</label>
          <select
            value={id_medico}
            onChange={e => setIdMedico(e.target.value)}
          >
            <option value="">Seleccionar médico</option>
            {medicos.map(m => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="form-actions">

        <button onClick={guardar}>
          Guardar
        </button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => router.push("/consultas")}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}