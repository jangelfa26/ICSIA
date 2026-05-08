import { conectarMongo } from "@/lib/mongo";
import { Historial } from "@/models/Historial";

export async function PUT(req, context) {

  await conectarMongo();

  try {

    const { id } = await context.params;

    const data = await req.json();

    const actualizado = await Historial.findByIdAndUpdate(
      id,
      data,
      {
        returnDocument: "after",
      }
    );

    return Response.json(actualizado);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error al actualizar historial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {

  await conectarMongo();

  try {

    const { id } = await context.params;

    await Historial.findByIdAndDelete(id);

    return Response.json({ ok: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error al eliminar historial" },
      { status: 500 }
    );
  }
}