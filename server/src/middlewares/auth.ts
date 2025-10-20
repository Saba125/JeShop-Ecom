import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../lib/config";
import {  IDbTools } from "../db/db_tools";
import { IUser } from "../interfaces/user";
import helpers from "../lib/helpers";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const db:IDbTools = req.app.locals.db!;
  const headers = req.headers;
  const authorizationHeader = headers["authorization"];
  if (!authorizationHeader) {
    return helpers.sendError(res, "Authorization headers not found");
  }
  const refreshToken = authorizationHeader.split(" ")[1];
  try {
    const verify: any = jwt.verify(refreshToken, config.JWT_SECRET);
    const user = await db.selectSingle("SELECT * FROM users WHERE uid = :uid", {
      uid: verify.uid
    }) as IUser;
    req.user = user;
    next();
  } catch (error) {
    return helpers.sendError(res, error);
  }

}
