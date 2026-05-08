import { Cita } from "@/models/Cita";
import { Paciente } from "@/models/Paciente";
import { Medico } from "@/models/Medico";
import { conectarMySQL } from "@/lib/mysql";

export async function GET() {
  try {
    await conectarMySQL();

    const ahora = Date.now();

    const citasRaw = await Cita.findAll({
      order: [["fecha", "DESC"]],
    });

    for (const cita of citasRaw) {

      if (cita.estado !== "Programada") {
        continue;
      }

      const fechaCita = new Date(cita.fecha);

      if (isNaN(fechaCita.getTime())) {
        continue;
      }

      const yaPaso =
        fechaCita.getTime() < (ahora - 60000);

      if (yaPaso) {
        await cita.update({
          estado: "Completada",
        });
      }
    }

    const citas = await Cita.findAll({
      include: [
        {
          model: Paciente,
          attributes: ["id", "nombre", "apellido"],
        },
        {
          model: Medico,
          attributes: ["id", "nombre", "especialidad"],
        },
      ],
      order: [["fecha", "DESC"]],
    });

    return Response.json(citas);

  } catch (error) {
    console.error("Error GET citas:", error);

    return Response.json(
      { error: "Error obteniendo citas" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await conectarMySQL();

    const data = await req.json();

    if (
      !data.motivo ||
      !data.fecha ||
      !data.id_paciente ||
      !data.id_medico
    ) {
      return Response.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const fecha = new Date(data.fecha);

    if (isNaN(fecha.getTime())) {
      return Response.json(
        { error: "Fecha inválida" },
        { status: 400 }
      );
    }

    if (
      !["Programada", "Completada", "Cancelada"]
        .includes(data.estado || "Programada")
    ) {
      return Response.json(
        { error: "Estado inválido" },
        { status: 400 }
      );
    }

    const nueva = await Cita.create({
      motivo: data.motivo,
      fecha: data.fecha,
      estado: data.estado || "Programada",
      id_paciente: Number(data.id_paciente),
      id_medico: Number(data.id_medico),
    });

    return Response.json(nueva);

  } catch (error) {
    console.error("Error POST cita:", error);

    return Response.json(
      { error: "Error creando cita" },
      { status: 500 }
    );
  }
}