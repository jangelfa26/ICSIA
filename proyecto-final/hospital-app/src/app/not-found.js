export default function NotFound() {

  return (
    <div className="notfound-page">

      <div className="notfound-card">

        <h1>404</h1>

        <h2>Página no encontrada</h2>

        <p>
          El recurso que intentas consultar no existe
          o fue eliminado.
        </p>

        <a
          href="/"
          className="btn-primary"
        >
          Volver al dashboard
        </a>

      </div>

    </div>
  );
}