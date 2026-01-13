import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../data/posts';

const PaginaDetalleArticulo = () => {
  const { postId } = useParams();
  const articulo = POSTS.find((a) => a.id.toString() === postId);

  if (!articulo) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div>
      <h1>{articulo.title}</h1>
      <p>{articulo.content}</p>
      <Link to="/posts">Volver a la lista de artículos</Link>
    </div>
  );
};

export default PaginaDetalleArticulo;
