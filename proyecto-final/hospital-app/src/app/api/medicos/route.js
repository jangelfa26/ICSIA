import { Medico } from "@/models/Medico";
import { initDB } from "@/lib/initDB";

function validarMedico(data) {

  if (!data.nombre?.trim()) {
    return "Nombre obligatorio";
  }

  if (!data.especialidad?.trim()) {
    return "Especialidad obligatoria";
  }

  if (
    !data.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return "Email inválido";
  }

  return null;
}

export async function GET() {

  await initDB();

  return Response.json(
    await Medico.findAll()
  );
}

export async function POST(req) {

  try {

    await initDB();

    const data = await req.json();

    const error = validarMedico(data);

    if (error) {
      return Response.json(
        { error },
        { status: 400 }
      );
    }

    const nuevo = await Medico.create(data);

    return Response.json(nuevo);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error creando médico" },
      { status: 500 }
    );
  }
}