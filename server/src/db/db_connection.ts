import mysql2 from "mysql2/promise";
import config from "../lib/config";
console.log(config);
// const pool: mysql2.Pool = mysql2.createPool({
//   host: config.DB_HOST,
//   database: config.DB_DATABASE,
//   user: config.DB_USER,
//   password: config.DB_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 10,
//   connectTimeout: 10000, // 10s timeout
// });
console.log(process.env.DATABASE_URL);
const pool = mysql2.createPool(process.env.DATABASE_URL as string);
export default pool;
