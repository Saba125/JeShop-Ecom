import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../lib/config";
import { IDbTools } from "../db/db_tools";
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
  const db: IDbTools = req.app.locals.db!;
  const headers = req.headers;
  const authorizationHeader = headers["authorization"];
  if (!authorizationHeader) {
    return helpers.sendError(res, "Authorization headers not found");
  }
  const refreshToken = authorizationHeader.split(" ")[1];
  try {
    const verify: any = jwt.verify(refreshToken, config.JWT_SECRET);
    const user = (await db.selectSingle(
      `
      SELECT u.*,
       COALESCE(
       JSON_ARRAYAGG(
       JSON_OBJECT(
            'uid', a.uid,
            'address_text', a.address_text,
            'address_lng', a.address_lng,
            'address_lat', a.address_lat
       )
       ),
       JSON_ARRAY()
       )
        AS addresses
        FROM
        users u
        LEFT JOIN addresses a on a.user_uid = u.uid
        WHERE u.uid = :uid
        GROUP by u.uid
        `,
      {
        uid: verify.uid,
      },
    )) as IUser;
    req.user = user;
    next();
  } catch (error) {
    return helpers.sendError(res, error);
  }
}
