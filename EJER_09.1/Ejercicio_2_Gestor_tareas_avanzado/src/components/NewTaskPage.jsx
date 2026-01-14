import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, status: "pending" });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Añadir Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Descripción" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NewTaskPage;
