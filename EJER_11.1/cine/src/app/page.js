export default function HomePage() {
  return (
    <div className="text-center py-5 my-5">
      <h1 className="display-1 fw-bold mb-4">Bienvenido a CineDB</h1>
      <p className="lead mb-5">Explora nuestra base de datos de cine con películas y actores.</p>
      <div className="row justify-content-center g-4">
        <div className="col-md-4">
          <a href="/movies" className="btn btn-primary btn-lg w-100 h-100 py-4">
            <i className="bi bi-film fs-1 d-block mb-2"></i>
            <span className="fs-3">Películas</span>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/actors" className="btn btn-outline-primary btn-lg w-100 h-100 py-4">
            <i className="bi bi-people fs-1 d-block mb-2"></i>
            <span className="fs-3">Actores</span>
          </a>
        </div>
      </div>
    </div>
  )
}