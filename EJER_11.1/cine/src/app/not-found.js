export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1 fw-bold text-muted">404</h1>
      <h2 className="display-4 mb-4">Página no encontrada</h2>
      <p className="lead mb-4">La página que buscas no existe.</p>
      <a href="/movies" className="btn btn-primary btn-lg">Ver Películas</a>
    </div>
  )
}
