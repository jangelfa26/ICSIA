import { conectarMongo } from "@/lib/mongo";
import { Historial } from "@/models/Historial";

export async function PUT(req, { params }) {
  await conectarMongo();

  try {
    const data = await req.json();

    await Historial.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: "Error al actualizar historial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await conectarMongo();

  try {
    await Historial.findByIdAndDelete(params.id);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: "Error al eliminar historial" },
      { status: 500 }
    );
  }
}