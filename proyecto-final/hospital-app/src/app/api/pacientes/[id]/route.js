import { Paciente } from "@/models/Paciente";
import { conectarMySQL } from "@/lib/mysql";

export async function PUT(req, context) {
  await conectarMySQL();

  const { id } = await context.params;
  const data = await req.json();

  await Paciente.update(data, { where: { id } });

  return Response.json({ ok: true });
}

export async function DELETE(req, context) {
  await conectarMySQL();

  const { id } = await context.params;

  await Paciente.destroy({ where: { id } });

  return Response.json({ ok: true });
}