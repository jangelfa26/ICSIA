"use server";

import { obtenerConexion } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function crearReceta(formData) {
    const conexion = await obtenerConexion();

    const titulo = formData.get("titulo");
    const descripcion = formData.get("descripcion");
    const ingredientes = formData.get("ingredientes");
    const instrucciones = formData.get("instrucciones");
    const tiempo = formData.get("tiempo");

    if (!titulo || !descripcion || !ingredientes || !instrucciones || !tiempo) {
        throw new Error("Todos los campos son obligatorios");
    }

    const [resultado] = await conexion.execute(
        `INSERT INTO recetas 
        (titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion)
        VALUES (?, ?, ?, ?, ?)`,
        [titulo, descripcion, ingredientes, instrucciones, tiempo]
    );
    revalidatePath("/");
    redirect(`/recetas/${resultado.insertId}`);
}

export async function actualizarReceta(id, formData) {
    const conexion = await obtenerConexion();

    await conexion.execute(
        `UPDATE recetas 
         SET titulo=?, descripcion_corta=?, ingredientes=?, instrucciones=?, tiempo_coccion=?
         WHERE id=?`,
        [
            formData.get("titulo"),
            formData.get("descripcion"),
            formData.get("ingredientes"),
            formData.get("instrucciones"),
            formData.get("tiempo"),
            id
        ]
    );

    revalidatePath("/");
    revalidatePath(`/recetas/${id}`);

    redirect(`/recetas/${id}`);
}

export async function borrarReceta(formData) {
    const id = formData.get("id");
    const conexion = await obtenerConexion();

    await conexion.execute("DELETE FROM recetas WHERE id = ?", [id]);
    revalidatePath("/");
    redirect("/");
}

export async function crearComentario(formData) {
    const conexion = await obtenerConexion();

    await conexion.execute(
        `INSERT INTO comentarios (receta_id, autor, texto)
         VALUES (?, ?, ?)`,
        [
            formData.get("receta_id"),
            formData.get("autor"),
            formData.get("texto")
        ]
    );

    revalidatePath(`/recetas/${formData.get("receta_id")}`);
}