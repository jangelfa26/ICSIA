import { Consulta } from "@/models/Consulta";
import { conectarMySQL } from "@/lib/mysql";

export async function GET() {
  await conectarMySQL();
  return Response.json(await Consulta.findAll());
}

export async function POST(req) {
  await conectarMySQL();
  const data = await req.json();

  if (!data.nombre || !data.codigo || !data.categoria) {
    return Response.json({ error: "Faltan datos" }, { status: 400 });
  }

  return Response.json(await Consulta.create(data));
}