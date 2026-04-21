import { obtenerConexion } from "@/lib/db";
import { actualizarReceta } from "@/acciones/recetas";
import Link from "next/link";

export default async function Editar({ params }) {
    const { id } = await params;

    const conexion = await obtenerConexion();
    const [[receta]] = await conexion.execute(
        "SELECT * FROM recetas WHERE id = ?",
        [id]
    );

    const accion = actualizarReceta.bind(null, id);

    return (
        <>
            <Link href={`/recetas/${id}`} className="volver">← Volver</Link>

            <h1>Editar Receta</h1>

            <form action={accion} className="formulario">

                <div className="campo">
                    <label>Título</label>
                    <input name="titulo" defaultValue={receta.titulo} />
                </div>

                <div className="campo">
                    <label>Descripción corta</label>
                    <textarea name="descripcion" defaultValue={receta.descripcion_corta} />
                </div>

                <div className="campo">
                    <label>Ingredientes</label>
                    <textarea name="ingredientes" defaultValue={receta.ingredientes} />
                </div>

                <div className="campo">
                    <label>Instrucciones</label>
                    <textarea name="instrucciones" defaultValue={receta.instrucciones} />
                </div>

                <div className="campo">
                    <label>Tiempo de cocción</label>
                    <input name="tiempo" defaultValue={receta.tiempo_coccion} />
                </div>

                <button>Actualizar</button>
            </form>
        </>
    );
}