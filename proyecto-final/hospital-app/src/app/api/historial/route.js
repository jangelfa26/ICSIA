import { conectarMongo } from "@/lib/mongo";
import { Historial } from "@/models/Historial";

export async function GET() {
  await conectarMongo();

  try {
    const datos = await Historial.find().sort({ fecha: -1 });
    return Response.json(datos);
  } catch (error) {
    return Response.json({ error: "Error al obtener historial" }, { status: 500 });
  }
}

export async function POST(req) {
  await conectarMongo();

  try {
    const data = await req.json();

    if (!data.diagnostico) {
      return Response.json(
        { error: "Diagnóstico requerido" },
        { status: 400 }
      );
    }

    const nuevo = new Historial(data);
    await nuevo.save();

    return Response.json(nuevo);
  } catch (error) {
    return Response.json({ error: "Error al crear historial" }, { status: 500 });
  }
}