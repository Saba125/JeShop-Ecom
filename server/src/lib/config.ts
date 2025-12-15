import dotenv from "dotenv";
dotenv.config();

interface Config {
  APP_PORT:number;
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
  CLIENT_ID:string;
  CLIENT_SECRET:string;
}

const config: Config = {
  APP_PORT: Number(process.env.APP_PORT) || 5000,
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
  CLIENT_ID: process.env.CLIENT_ID || "",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "",
};

export default config;
