import dotenv from "dotenv";
dotenv.config();

interface Config {
  DB_PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  FRONT_URL: string;
  BACK_URL: string;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
}

const config: Config = {
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DATABASE: process.env.DB_DATABASE || "je_shop_ecom",
  FRONT_URL: process.env.FRONT_URL || "http://localhost:5173",
  BACK_URL: process.env.BACK_URL || "http://localhost:5000",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL_HOST: process.env.EMAIL_HOST || "",
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
  JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "defaultcookie",
};

export default config;
