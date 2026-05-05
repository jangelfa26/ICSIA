import { DataTypes } from "sequelize";
import { sequelize } from "../lib/mysql";

export const Paciente = sequelize.define("Paciente", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido:  { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
}, {
  tableName: "pacientes",
  timestamps: true
});