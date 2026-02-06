import { getAllActors } from '@/lib/cinema'
import Link from 'next/link'

export default function ActorsPage() {
  const actors = getAllActors()
  return (
    <>
      <h1 className="display-4 fw-bold mb-5">Actores</h1>
      <div className="row g-4">
        {actors.map(actor => (
          <div key={actor.id} className="col-md-6 col-lg-4 col-xl-3">
            <Link href={`/actors/${actor.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow">
                <img src={actor.photo} className="card-img-top rounded-top" style={{height: '300px', objectFit: 'cover'}} alt={actor.name} />
                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  <h5 className="card-title fw-bold mb-1">{actor.name}</h5>
                  <p className="text-muted mb-0">Nacido en {actor.birthYear}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
