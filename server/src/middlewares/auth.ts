/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../lib/config";
import { getDbTools } from "../db/db_tools";
import helpers from "../lib/helpers";
import { IUser } from "../interfaces/user";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const db = await getDbTools();
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader?.split(" ")[1];
  if (!token) return helpers.sendError(res, "Token not found");

  try {
    const payload: any = jwt.verify(token, config.JWT_SECRET);
    const user = await db.selectSingle("select uid,username,email,user_type,is_active,email_verified_date,create_date from users where uid = :uid", {
      uid: payload.uid,
    }) as IUser;
    if (!user) {
      return helpers.sendError(res, "User not found");
    }
    req.user = {...user};
    next();
  } catch {
    res.sendStatus(403);
  }
}
