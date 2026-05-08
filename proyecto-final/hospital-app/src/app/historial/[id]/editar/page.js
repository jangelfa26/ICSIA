"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarHistorial() {
  const router = useRouter();
  const params = useParams();
  const [pacientes, setPacientes] = useState([]);
  const [id_paciente, setIdPaciente] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [medicamentos, setMedicamentos] = useState([]);

  const [receta, setReceta] = useState([
    {
      id_medicamento: "",
      nombre: "",
      dosis: "",
      frecuencia: "",
      duracion: ""
    }
  ]);

  useEffect(() => {

    const cargar = async () => {

      try {

        const [historialRes, medsRes, pacientesRes] = await Promise.all([
          fetch("/api/historial"),
          fetch("/api/medicamentos"),
          fetch("/api/pacientes")
        ]);

        const historialData = await historialRes.json();
        const medsData = await medsRes.json();
        const pacientesData = await pacientesRes.json();

        setPacientes(pacientesData);

        setMedicamentos(medsData);

        const h = historialData.find(
          x => x._id === params.id
        );


        if (h) {
          setIdPaciente(h.id_paciente || "");
          setDiagnostico(h.diagnostico || "");
          setObservaciones(h.observaciones || "");

          if (h.receta?.length > 0) {
            setReceta(h.receta);
          }
        }

      } catch (error) {
        console.error(error);
      }
    };

    if (params.id) {
      cargar();
    }

  }, [params.id]);

  const actualizarReceta = (index, campo, valor) => {

    const copia = [...receta];

    copia[index][campo] = valor;

    if (campo === "id_medicamento") {

      const med = medicamentos.find(
        m => m.id == valor
      );

      if (med) {
        copia[index].nombre = med.nombre;
      }
    }

    setReceta(copia);
  };

  const guardar = async () => {

    try {

      const res = await fetch(
        `/api/historial/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id_paciente: Number(id_paciente),
            diagnostico,
            observaciones,
            receta
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error actualizando");
      }

      window.location.href = "/historial";

    } catch (error) {

      console.error(error);

      alert("Error actualizando historial");
    }
  };

  return (
    <div className="container">

      <h1>Editar historial</h1>

      <label>Paciente</label>

      <select
        value={id_paciente}
        onChange={e => setIdPaciente(e.target.value)}
      >
        <option value="">
          Seleccionar paciente
        </option>

        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            #{p.id} - {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Diagnóstico</label>

      <input
        value={diagnostico}
        onChange={e => setDiagnostico(e.target.value)}
      />

      <br /><br />

      <label>Observaciones</label>

      <textarea
        value={observaciones}
        onChange={e => setObservaciones(e.target.value)}
      />

      <br /><br />

      <h3>Receta</h3>

      {receta.map((r, index) => (

        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 10
          }}
        >

          <label>Medicamento</label>

          <select
            value={r.id_medicamento}
            onChange={e =>
              actualizarReceta(
                index,
                "id_medicamento",
                e.target.value
              )
            }
          >
            <option value="">
              Seleccionar medicamento
            </option>

            {medicamentos.map(m => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>

          <br /><br />

          <label>Dosis</label>

          <input
            value={r.dosis}
            onChange={e =>
              actualizarReceta(
                index,
                "dosis",
                e.target.value
              )
            }
          />

          <br /><br />

          <label>Frecuencia</label>

          <input
            value={r.frecuencia}
            onChange={e =>
              actualizarReceta(
                index,
                "frecuencia",
                e.target.value
              )
            }
          />

          <br /><br />

          <label>Duración</label>

          <input
            value={r.duracion}
            onChange={e =>
              actualizarReceta(
                index,
                "duracion",
                e.target.value
              )
            }
          />
          <br />

          <button
            type="button"
            onClick={() => {

              const nuevas = receta.filter(
                (_, i) => i !== index
              );

              setReceta(nuevas);
            }}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            🗑️ Eliminar medicamento
          </button>
        </div>
      ))}

      <button
        onClick={() => setReceta([
          ...receta,
          {
            id_medicamento: "",
            nombre: "",
            dosis: "",
            frecuencia: "",
            duracion: ""
          }
        ])}
      >
        + Añadir medicamento
      </button>

      <br /><br />
      <div className="form-actions">

        <button onClick={guardar}>
          Guardar
        </button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => router.push("/historial")}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}