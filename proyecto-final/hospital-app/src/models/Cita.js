import { DataTypes } from "sequelize";
import { sequelize } from "../lib/mysql";
import { Paciente } from "./Paciente";
import { Medico } from "./Medico";

export const Cita = sequelize.define("Cita", {
  fecha: DataTypes.DATE,
  motivo: DataTypes.STRING,
  estado: {
    type: DataTypes.ENUM("Programada", "Completada", "Cancelada"),
    defaultValue: "Programada",
  },
  id_paciente: DataTypes.INTEGER,
  id_medico: DataTypes.INTEGER,
}, {
  tableName: "citas",
  timestamps: true
});

Paciente.hasMany(Cita, { foreignKey: "id_paciente" });
Cita.belongsTo(Paciente, { foreignKey: "id_paciente" });

Medico.hasMany(Cita, { foreignKey: "id_medico" });
Cita.belongsTo(Medico, { foreignKey: "id_medico" });