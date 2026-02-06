import { getActorById, getFilmographyByActorId } from '@/lib/cinema'
import Link from 'next/link'

export default async function ActorPage({ params }) {
  const { actorId } = await params  // ← ESTO ES CLAVE
  const actor = getActorById(actorId)
  const filmography = getFilmographyByActorId(actorId)
  
  if (!actor) return <div className="alert alert-warning">Actor no encontrado</div>

  return (
    <div>
      <div className="row g-5 align-items-start">
        <div className="col-md-4 text-center">
          <img src={actor.photo} className="rounded-circle img-fluid shadow-lg mb-4" style={{width: '250px', height: '250px', objectFit: 'cover'}} alt={actor.name} />
          <h1 className="display-5 fw-bold mb-3">{actor.name}</h1>
          <p className="lead mb-1">Nacido en {actor.birthYear}</p>
        </div>
        <div className="col-md-8">
          <p className="fs-5 lh-lg">{actor.bio}</p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="h3 fw-bold mb-4">Filmografía</h2>
          <div className="row g-4">
            {filmography.map(movie => (
              <div key={movie.id} className="col-md-6 col-lg-4 col-xl-3">
                <Link href={`/movies/${movie.id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm">
                    <img src={movie.poster} className="card-img-top" style={{height: '300px', objectFit: 'cover'}} alt={movie.title} />
                    <div className="card-body">
                      <h6 className="card-title fw-bold mb-1">{movie.title}</h6>
                      <small className="text-muted">{movie.year}</small>
                    </div>
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
