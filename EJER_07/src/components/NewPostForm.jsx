import React, { useState, useCallback, useEffect } from "react";

export default function FormularioNuevoPost() {
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [postCreado, setPostCreado] = useState(null);

  const addPost = useCallback(async () => {
    try {
      const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titulo,
            body: cuerpo,
          }),
        }
      );

      const datos = await respuesta.json();
      setPostCreado(datos);
    } catch (error) {
      console.error("Error creando el post:", error);
    }
  }, [titulo, cuerpo]);

  useEffect(() => {
    if (postCreado) {
      console.log("Nuevo post creado:", postCreado);
    }
  }, [addPost, postCreado]);

  const enviarFormulario = (event) => {
    event.preventDefault();
    addPost();
  };

  return (
    <div>
      <h2>Crear Nuevo Post</h2>

      <form onSubmit={enviarFormulario}>
        <input
          type="text"
          placeholder="Título del post"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />

        <textarea
          placeholder="Contenido del post"
          value={cuerpo}
          onChange={(event) => setCuerpo(event.target.value)}
        />

        <button type="submit">Crear Post</button>
      </form>

      {postCreado && (
        <p style={{ color: "green" }}>
          Post creado correctamente (ID: {postCreado.id})
        </p>
      )}
    </div>
  );
}
