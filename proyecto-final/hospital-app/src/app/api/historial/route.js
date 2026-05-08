import { conectarMongo } from "@/lib/mongo";
import { Historial } from "@/models/Historial";
import { conectarMySQL } from "@/lib/mysql";
import { Paciente } from "@/models/Paciente";

export async function GET() {
  await conectarMongo();
  await conectarMySQL();

  try {
    const historial = await Historial.find();

    const pacientes = await Paciente.findAll({
      attributes: ["id", "nombre", "apellido"]
    });

    const resultado = historial.map(h => {
      const paciente = pacientes.find(p => p.id === h.id_paciente);

      return {
        ...h._doc,
        paciente_nombre: paciente
          ? `${paciente.nombre} ${paciente.apellido || ""}`
          : `Paciente #${h.id_paciente}`
      };
    });
    return Response.json(resultado);
  } catch (error) {
    return Response.json({ error: "Error al obtener historial" }, { status: 500 });
  }
}

export async function POST(req) {
  await conectarMongo();

  try {
    const data = await req.json();

    if (!data.diagnostico) {
      return Response.json(
        { error: "Diagnóstico requerido" },
        { status: 400 }
      );
    }

    if (!data.id_paciente) {
      return Response.json(
        { error: "Paciente obligatorio" },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.receta)) {
      return Response.json(
        { error: "Receta inválida" },
        { status: 400 }
      );
    }

    const nuevo = new Historial(data);
    await nuevo.save();

    return Response.json(nuevo);
  } catch (error) {
    return Response.json({ error: "Error al crear historial" }, { status: 500 });
  }
}
