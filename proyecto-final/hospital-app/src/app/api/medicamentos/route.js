import { Medicamento } from "@/models/Medicamento";
import { initDB } from "@/lib/initDB";

export async function GET() {
  await initDB();
  return Response.json(await Medicamento.findAll());
}

export async function POST(req) {
  await initDB();

  const data = await req.json();

  if (!data.nombre) {
    return Response.json({ error: "Nombre requerido" }, { status: 400 });
  }

  const nuevo = await Medicamento.create(data);
  return Response.json(nuevo);
}