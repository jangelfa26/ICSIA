import { obtenerConexion } from "@/lib/db";
import { borrarReceta, crearComentario } from "@/acciones/recetas";
import Link from "next/link";

export default async function Receta({ params }) {
    const { id } = await params;

    const conexion = await obtenerConexion();

    const [[receta]] = await conexion.execute(
        "SELECT * FROM recetas WHERE id = ?",
        [id]
    );

    const [comentarios] = await conexion.execute(
        "SELECT * FROM comentarios WHERE receta_id = ?",
        [id]
    );

    return (
        <>
            <Link href="/" className="volver">← Volver</Link>

            <div className="receta-detalle">
                <h1>{receta.titulo}</h1>

                <p><strong>Descripción:</strong> {receta.descripcion_corta}</p>
                <p><strong>Tiempo:</strong> {receta.tiempo_coccion} min</p>

                <div className="bloque">
                    <h2>Ingredientes</h2>
                    <p>{receta.ingredientes}</p>
                </div>

                <div className="bloque">
                    <h2>Instrucciones</h2>
                    <p>{receta.instrucciones}</p>
                </div>

                <div className="acciones">
                    <Link href={`/recetas/${id}/editar`} className="boton">
                        Editar
                    </Link>

                    <form action={borrarReceta}>
                        <input type="hidden" name="id" value={id} />
                        <button className="boton-danger">Borrar</button>
                    </form>
                </div>

                <div className="bloque">
                    <h2>Comentarios</h2>

                    {comentarios.map(c => (
                        <div key={c.id} className="comentario">
                            <strong>{c.autor}</strong>
                            <p>{c.texto}</p>
                        </div>
                    ))}
                </div>

                <div className="bloque">
                    <h3>Añadir comentario</h3>

                    <form action={crearComentario} className="formulario">
                        <input type="hidden" name="receta_id" value={id} />

                        <div className="campo">
                            <label>Nombre</label>
                            <input name="autor" required />
                        </div>

                        <div className="campo">
                            <label>Comentario</label>
                            <textarea name="texto" required />
                        </div>

                        <button>Comentar</button>
                    </form>
                </div>
            </div>
        </>
    );
}