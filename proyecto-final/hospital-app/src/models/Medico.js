import { DataTypes } from "sequelize";
import { sequelize } from "../lib/mysql";

export const Medico = sequelize.define("Medico", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  imagen: DataTypes.STRING
}, {
  tableName: "medicos",
  timestamps: true
});