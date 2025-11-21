import React, { useEffect, useState } from "react";

export default function ListaPosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPosts = async () => {
      try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
        const datos = await respuesta.json();
        setPosts(datos);
      } catch (error) {
        console.error("Error cargando los posts:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarPosts();
  }, []);

  if (cargando) {
    return <p>Cargando posts...</p>;
  }

  return (
    <div>
      <h2>Lista de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
