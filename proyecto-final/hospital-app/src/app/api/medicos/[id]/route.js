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

export async function GET(req, context) {

  try {

    await initDB();

    const { id } = await context.params;

    const medico = await Medico.findByPk(id);

    if (!medico) {
      return Response.json(
        { error: "No encontrado" },
        { status: 404 }
      );
    }

    return Response.json(medico);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error obteniendo médico" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {

  try {

    await initDB();

    const { id } = await context.params;

    const data = await req.json();

    const error = validarMedico(data);

    if (error) {
      return Response.json(
        { error },
        { status: 400 }
      );
    }

    await Medico.update(data, {
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error actualizando médico" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {

  try {

    await initDB();

    const { id } = await context.params;

    await Medico.destroy({
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error eliminando médico" },
      { status: 500 }
    );
  }
}