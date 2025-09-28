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
dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = config.DB_PORT;
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
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

// serve static files
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.get("/*", function (req: Request, res: Response, next: NextFunction) {
  if (req.headers && req.headers.host && req.headers.host.match(/^www/) !== null) {
    res.redirect("https://" + req.headers.host.replace(/^www\./, "") + req.url);
  } else {
    next();
  }
});

app.use("/api", Router);

httpServer.listen(port, () => {
  logger.info(`SERVER RUNNING ON ${port}`);
});
