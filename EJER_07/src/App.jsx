import { useState } from "react";
import ListaPosts from "./components/PostList";
import DetallesPost from "./components/PostDetails";
import BusquedaUsuarios from "./components/UserSearch";
import ComentariosPost from "./components/PostComments";
import FormularioNuevoPost from "./components/NewPostForm";

function App() {
  const [postIdSeleccionado, setPostIdSeleccionado] = useState(1);

  return <>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Proyecto React con Vite - Ejercicios API</h1>

      <hr />

      <section style={{ marginBottom: "40px" }}>
        <h2>Ejercicio 1: Lista de Posts</h2>
        <ListaPosts />
      </section>

      <hr />

      <section style={{ marginBottom: "40px" }}>
        <h2>Ejercicio 2: Detalles de un Post</h2>
        <label>
          Selecciona Post ID:{" "}
          <input
            type="number"
            min="1"
            max="100"
            value={postIdSeleccionado}
            onChange={(e) => setPostIdSeleccionado(Number(e.target.value))}
          />
        </label>
        <DetallesPost postId={postIdSeleccionado} />
      </section>

      <hr />

      <section style={{ marginBottom: "40px" }}>
        <h2>Ejercicio 3: Búsqueda de Usuarios</h2>
        <BusquedaUsuarios />
      </section>

      <hr />

      <section style={{ marginBottom: "40px" }}>
        <h2>Ejercicio 4: Comentarios de un Post</h2>
        <ComentariosPost postId={postIdSeleccionado} />
                <ComentariosPost postId={101} />
      </section>

      <hr />

      <section style={{ marginBottom: "40px" }}>
        <h2>Ejercicio 5: Crear Nuevo Post</h2>
        <FormularioNuevoPost />
      </section>
    </div>
  </>

}

export default App
