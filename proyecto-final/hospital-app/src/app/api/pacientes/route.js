import { Paciente } from "@/models/Paciente";
import { conectarMySQL } from "@/lib/mysql";

function validarPaciente(data) {

  if (!data.nombre?.trim()) {
    return "El nombre es obligatorio";
  }

  if (!data.apellido?.trim()) {
    return "El apellido es obligatorio";
  }

  if (
    data.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return "Email inválido";
  }

  return null;
}

export async function GET() {
  await conectarMySQL();

  return Response.json(
    await Paciente.findAll()
  );
}

export async function POST(req) {

  try {

    await conectarMySQL();

    const data = await req.json();

    const error = validarPaciente(data);

    if (error) {
      return Response.json(
        { error },
        { status: 400 }
      );
    }

    const nuevo = await Paciente.create(data);

    return Response.json(nuevo);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error creando paciente" },
      { status: 500 }
    );
  }
}