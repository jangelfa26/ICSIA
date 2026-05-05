"use client";
import { useState } from "react";

export default function NuevoMedicamento() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

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
    <div className="container">
      <h1>Nuevo medicamento</h1>

      <input
        placeholder="Nombre"
        onChange={e => setNombre(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        onChange={e => setDescripcion(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        onChange={e => setStock(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio (€)"
        onChange={e => setPrecio(e.target.value)}
      />

      <button onClick={crear}>Crear</button>
    </div>
  );
}