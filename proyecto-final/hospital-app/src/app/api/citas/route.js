import { Cita } from "@/models/Cita";
import { initDB } from "@/lib/initDB";

export async function PUT(req, context) {
  await initDB();

  const { id } = await context.params;
  const data = await req.json();

  await Cita.update(data, {
    where: { id }
  });

  return Response.json({ ok: true });
}

export async function DELETE(req, context) {
  await initDB();

  const { id } = await context.params;

  await Cita.destroy({
    where: { id }
  });

  return Response.json({ ok: true });
}