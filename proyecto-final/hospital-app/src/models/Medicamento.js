import { DataTypes } from "sequelize";
import { sequelize } from "../lib/mysql";

export const Medicamento = sequelize.define("Medicamento", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: DataTypes.STRING,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precio: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
  }, {
  tableName: "medicamentos",
  timestamps: true
});