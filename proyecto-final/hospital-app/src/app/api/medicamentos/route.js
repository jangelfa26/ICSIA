import { Medicamento } from "@/models/Medicamento";
import { initDB } from "@/lib/initDB";

function validarMedicamento(data) {

  if (!data.nombre?.trim()) {
    return "Nombre obligatorio";
  }

  if (Number(data.precio) < 0) {
    return "Precio inválido";
  }

  if (Number(data.stock) < 0) {
    return "Stock inválido";
  }

  return null;
}

export async function GET() {

  await initDB();

  return Response.json(
    await Medicamento.findAll()
  );
}

export async function POST(req) {

  try {

    await initDB();

    const data = await req.json();

    const error = validarMedicamento(data);

    if (error) {
      return Response.json(
        { error },
        { status: 400 }
      );
    }

    const nuevo = await Medicamento.create(data);

    return Response.json(nuevo);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error creando medicamento" },
      { status: 500 }
    );
  }
}