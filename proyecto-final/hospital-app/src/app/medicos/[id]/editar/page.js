"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function EditarMedico() {

  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [foto, setFoto] = useState("");
  const router = useRouter();
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {

    if (!id) return;

    const cargar = async () => {

      try {

        const res = await fetch(`/api/medicos/${id}`);

        if (!res.ok) {
          throw new Error("Error cargando médico");
        }

        const data = await res.json();

        setNombre(data.nombre || "");
        setEmail(data.email || "");
        setEspecialidad(data.especialidad || "");
        setFoto(data.foto || "");

      } catch (err) {
        console.error(err);
      }
    };

    cargar();

  }, [id]);

  const guardar = async () => {

    if (!nombre || !email || !especialidad) {
      return alert("Completa todos los campos");
    }

    if (errorEmail) {
      return alert("Corrige el email");
    }

    await fetch(`/api/medicos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        email,
        especialidad,
        foto
      }),
    });

    window.location.href = "/medicos";
  };

  return (
    <div className="container">

      <h1>Editar médico</h1>

      <label>Nombre</label>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <br />

      <label>Email</label>

      <input
        type="email"
        placeholder="correo@hospital.com"
        value={email}
        onChange={(e) => {

          const valor = e.target.value;

          setEmail(valor);

          if (
            valor &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
          ) {
            setErrorEmail("Formato de email inválido");
          } else {
            setErrorEmail("");
          }

        }}
        style={{
          border: errorEmail
            ? "2px solid red"
            : "1px solid #ccc"
        }}
      />

      {errorEmail && (
        <p className="error">
          {errorEmail}
        </p>
      )}

      <br />

      <label>Especialidad</label>

      <input
        value={especialidad}
        onChange={e => setEspecialidad(e.target.value)}
      />

      <br />

      <label>Foto (URL)</label>

      <input
        value={foto}
        onChange={e => setFoto(e.target.value)}
      />

      <br />
      <div className="form-actions">

        <button onClick={guardar}>
          Guardar
        </button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => router.push("/medicos")}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}