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

export async function PUT(req, context) {

  try {

    await conectarMySQL();

    const { id } = await context.params;

    const data = await req.json();

    const error = validarPaciente(data);

    if (error) {
      return Response.json(
        { error },
        { status: 400 }
      );
    }

    await Paciente.update(data, {
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error actualizando paciente" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {

  try {

    await conectarMySQL();

    const { id } = await context.params;

    await Paciente.destroy({
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error eliminando paciente" },
      { status: 500 }
    );
  }
}