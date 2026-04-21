import { obtenerConexion } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const conexion = await obtenerConexion();
  const [recetas] = await conexion.execute("SELECT * FROM recetas");

  return (
    <main>
      <h1>Recetas</h1>

      <Link href="/recetas/nueva">Crear nueva receta</Link>

      {recetas.map((receta) => (
        <div key={receta.id}>
          <div className="card">
            <h2>{receta.titulo}</h2>
            <p>{receta.descripcion_corta}</p>
            <Link href={`/recetas/${receta.id}`}>Ver receta</Link>
          </div>
        </div>
      ))}
    </main>
  );
}