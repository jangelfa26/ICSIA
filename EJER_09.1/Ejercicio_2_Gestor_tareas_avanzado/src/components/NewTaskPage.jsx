import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí simula el guardado de la tarea
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Añadir Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NewTaskPage;
