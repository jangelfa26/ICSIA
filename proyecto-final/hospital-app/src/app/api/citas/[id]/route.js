import { Cita } from "@/models/Cita";
import { initDB } from "@/lib/initDB";

export async function PUT(req, { params }) {
  await initDB();

  const data = await req.json();

  await Cita.update(data, {
    where: { id: params.id }
  });

  return Response.json({ ok: true });
}

export async function DELETE(req, { params }) {
  await initDB();

  await Cita.destroy({
    where: { id: params.id }
  });

  return Response.json({ ok: true });
}