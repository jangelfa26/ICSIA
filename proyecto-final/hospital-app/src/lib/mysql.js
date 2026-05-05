import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
});

export async function conectarMySQL() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error(error);
  }
}