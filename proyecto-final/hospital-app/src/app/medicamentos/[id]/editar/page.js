"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarMedicamento() {
  const params = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    fetch("/api/medicamentos")
      .then(r => r.json())
      .then(data => {
        const m = data.find(x => x.id == params.id);

        if (m) {
          setNombre(m.nombre);
          setDescripcion(m.descripcion || "");
          setStock(m.stock);
          setPrecio(m.precio);
        }
      });
  }, [params.id]);

  const guardar = async () => {
    await fetch(`/api/medicamentos/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        stock: Number(stock),
        precio: Number(precio)
      })
    });

    window.location.href = "/medicamentos";
  };

  return (
    <div className="container">
      <h1>Editar medicamento</h1>

      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <textarea
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      <input
        type="number"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <input
        type="number"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}