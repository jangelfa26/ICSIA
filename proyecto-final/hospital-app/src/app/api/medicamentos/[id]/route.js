import { Medicamento } from "@/models/Medicamento";
import { conectarMySQL } from "@/lib/mysql";

export async function GET(req, context) {
  try {
    await conectarMySQL();

    const { id } = await context.params;

    const medicamento = await Medicamento.findByPk(id);

    if (!medicamento) {
      return Response.json(
        { error: "Medicamento no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(medicamento);

  } catch (error) {
    console.error("Error GET medicamento:", error);

    return Response.json(
      { error: "Error obteniendo medicamento" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    await conectarMySQL();

    const { id } = await context.params;

    const data = await req.json();

    await Medicamento.update(data, {
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {
    console.error("Error PUT medicamento:", error);

    return Response.json(
      { error: "Error actualizando medicamento" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await conectarMySQL();

    const { id } = await context.params;

    await Medicamento.destroy({
      where: { id }
    });

    return Response.json({ ok: true });

  } catch (error) {
    console.error("Error DELETE medicamento:", error);

    return Response.json(
      { error: "Error eliminando medicamento" },
      { status: 500 }
    );
  }
}