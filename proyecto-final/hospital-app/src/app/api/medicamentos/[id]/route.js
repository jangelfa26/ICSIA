import { Medicamento } from "@/models/Medicamento";
import { initDB } from "@/lib/initDB";

export async function PUT(req, { params }) {
  await initDB();

  const data = await req.json();

  await Medicamento.update(data, {
    where: { id: params.id }
  });

  return Response.json({ ok: true });
}

export async function GET(req, { params }) {
  await initDB();

  const medicamento = await Medicamento.findByPk(params.id);

  if (!medicamento) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }

  return Response.json(medicamento);
}

export async function DELETE(req, { params }) {
  await initDB();

  await Medicamento.destroy({
    where: { id: params.id }
  });

  return Response.json({ ok: true });
}