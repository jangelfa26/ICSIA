import { getAllMovies } from '@/lib/cinema'
import Link from 'next/link'

export default function MoviesPage() {
  const movies = getAllMovies()
  return (
    <>
      <h1 className="display-4 fw-bold mb-5">Películas</h1>
      <div className="row g-4">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 col-lg-3">
            <Link href={`/movies/${movie.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img src={movie.poster} className="card-img-top" style={{height: '400px', objectFit: 'cover'}} alt={movie.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{movie.title}</h5>
                  <p className="card-text text-muted small">{movie.year}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
