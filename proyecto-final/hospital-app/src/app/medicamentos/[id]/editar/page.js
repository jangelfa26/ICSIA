"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditarMedicamento() {
  const params = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const router = useRouter();

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
    <div className="form-container">

      <div className="form-card">

        <h1>Editar medicamento</h1>

        <label>Nombre</label>

        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Ej: Paracetamol"
        />

        <label>Descripción</label>

        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripción del medicamento"
          rows={5}
        />

        <label>Stock</label>

        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Cantidad disponible"
        />

        <label>Precio (€)</label>

        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          placeholder="0.00"
        />

        <div className="form-actions">

          <button onClick={guardar}>
            Guardar
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