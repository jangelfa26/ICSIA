import { Medico } from "@/models/Medico";
import { initDB } from "@/lib/initDB";

export async function GET(req, context) {
  await initDB();

  const { id } = await context.params;

  const medico = await Medico.findByPk(id);

  if (!medico) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }

  return Response.json(medico);
}

export async function PUT(req, context) {
  await initDB();

  const { id } = await context.params;
  const data = await req.json();

  await Medico.update(data, {
    where: { id }
  });

  return Response.json({ ok: true });
}

export async function DELETE(req, context) {
  await initDB();

  const { id } = await context.params;

  await Medico.destroy({
    where: { id }
  });

  return Response.json({ ok: true });
}