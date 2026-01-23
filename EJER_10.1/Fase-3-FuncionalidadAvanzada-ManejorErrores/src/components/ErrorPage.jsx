import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="error-page">
      <h2>Ocurrió un error al cargar los datos del país.</h2>
      <p>Por favor, intente nuevamente más tarde.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default ErrorPage;
