import { Consulta } from "@/models/Consulta";
import { conectarMySQL } from "@/lib/mysql";

export async function PUT(req, context) {
  const { id } = await context.params;

  await conectarMySQL();
  const data = await req.json();

  await Consulta.update(data, {
    where: { id },
  });

  return Response.json({ ok: true });
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  await conectarMySQL();

  await Consulta.destroy({
    where: { id },
  });

  return Response.json({ ok: true });
}