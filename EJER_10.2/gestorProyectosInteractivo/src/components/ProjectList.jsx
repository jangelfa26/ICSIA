import { Link } from "react-router-dom";

const ProjectList = ({ proyectos }) => {
  return (
    <div>
      {proyectos.map((proyecto) => (
        <div key={proyecto.id}>
          <Link to={`/proyectos/${proyecto.id}`}>
            <h3>{proyecto.nombre}</h3>
          </Link>
          <p>{proyecto.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
