import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts.js';

const PaginaArticulos = () => {
  return (
    <div>
      <h1>Lista de Artículos</h1>
      <ul>
        {POSTS.map((articulo) => (
          <li key={articulo.id}>
            <Link to={`/posts/${articulo.id}`}>{articulo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaArticulos;
