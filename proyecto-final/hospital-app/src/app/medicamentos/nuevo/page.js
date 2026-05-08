"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoMedicamento() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const router = useRouter();
  const crear = async () => {
    if (!nombre || !precio) {
      return alert("Nombre y precio son obligatorios");
    }

    await fetch("/api/medicamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        stock: Number(stock) || 0,
        precio: Number(precio)
      })
    });

    window.location.href = "/medicamentos";
  };

  return (
    <div className="form-container">

      <div className="form-card">

        <h1>Nuevo medicamento</h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Registra un nuevo medicamento en el sistema
        </p>

        <label>Nombre del medicamento</label>

        <input
          type="text"
          placeholder="Ej: Paracetamol"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <label>Descripción</label>

        <textarea
          placeholder="Describe el medicamento, uso, observaciones..."
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          rows={5}
        />

        <label>Stock disponible</label>

        <input
          type="number"
          placeholder="Ej: 25"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <label>Precio (€)</label>

        <input
          type="number"
          step="0.01"
          placeholder="Ej: 12.50"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />

        <div className="form-actions">

          <button onClick={crear}>
            💊 Crear medicamento
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={() => router.push("/medicamentos")}
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}