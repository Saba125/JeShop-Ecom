import mysql2 from "mysql2/promise";
import config from "../lib/config";
const pool: mysql2.Pool = mysql2.createPool({
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});
// for deployment
// const pool: mysql2.Pool = mysql2.createPool(config.DB_HOST);
export default pool;
