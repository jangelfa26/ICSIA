import { DataTypes } from "sequelize";
import { sequelize } from "../lib/mysql";

export const Medico = sequelize.define("medicos", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: DataTypes.STRING
}, {
  tableName: "medicos",
  timestamps: true
});