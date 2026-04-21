import { crearReceta } from "@/acciones/recetas";
import Link from "next/link";

export default function NuevaReceta() {
    return (
        <>
            <Link href="/" className="volver">← Volver</Link>

            <h1>Nueva Receta</h1>

            <form action={crearReceta} className="formulario">

                <div className="campo">
                    <label>Título</label>
                    <input name="titulo" required />
                </div>

                <div className="campo">
                    <label>Descripción corta</label>
                    <textarea name="descripcion" required />
                </div>

                <div className="campo">
                    <label>Ingredientes</label>
                    <textarea name="ingredientes" required />
                </div>

                <div className="campo">
                    <label>Instrucciones</label>
                    <textarea name="instrucciones" required />
                </div>

                <div className="campo">
                    <label>Tiempo de cocción (minutos)</label>
                    <input type="number" name="tiempo" required />
                </div>

                <button>Crear receta</button>
            </form>
        </>
    );
}