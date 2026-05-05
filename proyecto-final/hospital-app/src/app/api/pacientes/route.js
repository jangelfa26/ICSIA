import { Paciente } from "@/models/Paciente";
import { conectarMySQL } from "@/lib/mysql";

export async function GET() {
  await conectarMySQL();
  return Response.json(await Paciente.findAll());
}

export async function POST(req) {
  await conectarMySQL();
  const data = await req.json();

  if (!data.nombre) {
    return Response.json({ error: "Nombre requerido" }, { status: 400 });
  }

  return Response.json(await Paciente.create(data));
}