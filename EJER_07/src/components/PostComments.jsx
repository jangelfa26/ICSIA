import React, { useEffect, useState } from "react";

export default function ComentariosPost({ postId }) {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const cargarComentarios = async () => {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );

        if (!respuesta.ok) {
          throw new Error("Error al cargar los comentarios");
        }

        const datos = await respuesta.json();
        setComentarios(datos);
      } catch (err) {
        setError("Hubo un problema cargando los comentarios.");
      } finally {
        setCargando(false);
      }
    };

    cargarComentarios();
  }, [postId]);

  return (
    <div>
      <h3>Comentarios del Post #{postId}</h3>

      {cargando && <p>Cargando comentarios...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!cargando && !error && comentarios.length > 0 && (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.name}</strong>
              <br />
              {comentario.body}
            </li>
          ))}
        </ul>
      )}

      {!cargando && !error && comentarios.length === 0 && (
        <p>No hay comentarios disponibles.</p>
      )}
    </div>
  );
}
