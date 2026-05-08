import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/mysql";
import { Medico } from "./Medico";

export const Consulta = sequelize.define("consultas", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  categoria: {
    type: DataTypes.ENUM(
      "General",
      "Pediatria",
      "Urgencias",
      "Especializada"
    ),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM(
      "Disponible",
      "Asignada",
      "Mantenimiento"
    ),
    defaultValue: "Disponible",
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Consulta.belongsTo(Medico, { foreignKey: "id_medico" });
Medico.hasMany(Consulta, { foreignKey: "id_medico" });