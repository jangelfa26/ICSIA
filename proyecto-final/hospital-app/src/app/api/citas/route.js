import { Cita } from "@/models/Cita";
import { conectarMySQL } from "@/lib/mysql";

export async function GET() {
  await conectarMySQL();
  return Response.json(await Cita.findAll());
}

export async function POST(req) {
  await conectarMySQL();
  const data = await req.json();
  return Response.json(await Cita.create(data));
}