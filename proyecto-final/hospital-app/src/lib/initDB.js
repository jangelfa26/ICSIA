import { sequelize } from "./mysql";

import "@/models/Paciente";
import "@/models/Medico";
import "@/models/Cita";
import "@/models/Medicamento";

let inicializada = false;

export async function initDB() {
  if (inicializada) return;

  try {
    await sequelize.authenticate();

    await sequelize.sync({
      alter: true
    });

    inicializada = true;

    console.log("Base de datos MySQL inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar MySQL:", error);
    throw error;
  }
}