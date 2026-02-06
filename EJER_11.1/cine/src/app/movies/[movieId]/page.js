import { getMovieById, getCastByMovieId } from '@/lib/cinema'
import Link from 'next/link'

export default async function MoviePage({ params }) {
  const { movieId } = await params  // ← ESTO ES CLAVE
  const movie = getMovieById(movieId)
  const cast = getCastByMovieId(movieId)
  
  if (!movie) return <div className="alert alert-warning">Película no encontrada</div>

  return (
    <div>
      <div className="row g-5">
        <div className="col-lg-4">
          <img src={movie.poster} className="img-fluid rounded shadow" style={{height: '500px', objectFit: 'cover'}} alt={movie.title} />
        </div>
        <div className="col-lg-8">
          <h1 className="display-3 fw-bold mb-4">{movie.title}</h1>
          <p className="lead mb-3">
            <strong>{movie.year}</strong> • Dir. <em>{movie.director}</em>
          </p>
          <p className="fs-5">{movie.synopsis}</p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="h3 fw-bold mb-4">Reparto</h2>
          <div className="row g-3">
            {cast.map(({ id, name, photo, character }) => (
              <div key={id} className="col-sm-6 col-md-4 col-lg-3">
                <Link href={`/actors/${id}`} className="text-decoration-none">
                  <div className="card h-100 text-center p-3 border-0 shadow-sm hover-shadow">
                    <img src={photo} className="rounded-circle mx-auto d-block mb-2" style={{width: '80px', height: '80px', objectFit: 'cover'}} alt={name} />
                    <h6 className="fw-bold mb-1">{name}</h6>
                    <small className="text-muted">({character})</small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
