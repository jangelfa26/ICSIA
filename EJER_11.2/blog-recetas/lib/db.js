import mysql from "mysql2/promise";

export async function obtenerConexion() {
    return await mysql.createConnection({
        host: "blog-recetas.cwvtvozkfzfn.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "RZ2?fzKb#6hY8f",
        database: "blogRecetas",

        ssl: {
            rejectUnauthorized: false
        }
    });
}