import { Paciente } from "@/models/Paciente";
import { conectarMySQL } from "@/lib/mysql";

export async function PUT(req, { params }) {
  await conectarMySQL();
  const data = await req.json();
  await Paciente.update(data, { where: { id: params.id } });
  return Response.json({ ok: true });
}

export async function DELETE(req, { params }) {
  await conectarMySQL();
  await Paciente.destroy({ where: { id: params.id } });
  return Response.json({ ok: true });
}