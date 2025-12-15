import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import Router from "./routes";
import config from "./lib/config";
import createLogger from "./lib/logger";
import { getDbTools } from "./db/db_tools";
dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = config.APP_PORT;
const logger = createLogger("server");
// Middlewares
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(
  cors({
    origin: config.FRONT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieParser(config.COOKIE_SECRET));
app.use(morgan("dev"));

// serve static files
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.host?.startsWith("www.")) {
    return res.redirect("https://" + req.headers.host.replace(/^www\./, "") + req.url);
  }
  next();
});


app.use("/api", Router);

httpServer.listen(port, async() => {
  try {
    const dbTools = await getDbTools();
    logger.info(`SERVER RUNNING ON ${port}`);
    app.locals.db = dbTools;
  } catch (error) {
    logger.error("Failed to connect to the database", error);
  }
});
