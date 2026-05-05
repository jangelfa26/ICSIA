"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleMedicamento() {
  const params = useParams();

  const [medicamento, setMedicamento] = useState(null);

  useEffect(() => {
    fetch(`/api/medicamentos/${params.id}`)
      .then(r => r.json())
      .then(data => {
        const m = data.find(x => x.id == params.id);
        setMedicamento(m);
      });
  }, [params.id]);

  if (!medicamento) return "Cargando...";

  return (
    <div className="container">
      <h1>{medicamento.nombre}</h1>

      <p><b>Descripción:</b> {medicamento.descripcion}</p>
      <p><b>Stock:</b> {medicamento.stock}</p>
      <p><b>Precio:</b> {medicamento.precio} €</p>

      <a href={`/medicamentos/${medicamento.id}/editar`}>
        Editar
      </a>
    </div>
  );
}