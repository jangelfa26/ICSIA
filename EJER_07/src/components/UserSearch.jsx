import React, { useState, useEffect } from "react";

export default function BusquedaUsuarios() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!terminoBusqueda) {
      setUsuarios([]);
      return;
    }

    setCargando(true);

    const temporizador = setTimeout(async () => {
      try {
        const respuesta = await fetch(
          `https://jsonplaceholder.typicode.com/users?username=${terminoBusqueda}`
        );
        const datos = await respuesta.json();
        setUsuarios(datos);
      } catch (error) {
        console.error("Error buscando usuarios:", error);
      } finally {
        setCargando(false);
      }
    }, 500);

    return () => clearTimeout(temporizador);
  }, [terminoBusqueda]);

  return (
    <div>
      <h2>Búsqueda de Usuarios</h2>
      <input
        type="text"
        placeholder="Escribe un username..."
        value={terminoBusqueda}
        onChange={(event) => setTerminoBusqueda(event.target.value)}
      />

      {cargando && <p>Cargando resultados...</p>}

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.username}</strong> - {usuario.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
