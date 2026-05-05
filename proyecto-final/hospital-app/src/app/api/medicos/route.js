import { Medico } from "@/models/Medico";
import { initDB } from "@/lib/initDB";

export async function GET() {
  await initDB();
  return Response.json(await Medico.findAll());
}

export async function POST(req) {
  await initDB();

  try {
    const data = await req.json();

    if (!data.nombre || !data.especialidad) {
      return Response.json(
        { error: "Faltan datos" },
        { status: 400 }
      );
    }

    const nuevo = await Medico.create(data);
    return Response.json(nuevo);
  } catch (e) {
    return Response.json(
      { error: "Error al crear médico" },
      { status: 500 }
    );
  }
}