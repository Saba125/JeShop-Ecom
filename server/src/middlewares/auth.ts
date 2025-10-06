import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../lib/config";
import { getDbTools } from "../db/db_tools";
import { IUser } from "../interfaces/user";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      // Changed from helpers.sendError
      success: false,
      error: "Access token not found",
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = jwt.verify(token, config.JWT_SECRET);

    const db = await getDbTools();
    const user = (await db.selectSingle(
      "SELECT uid, username, email, user_type, is_active, email_verified_date, create_date FROM users WHERE uid = :uid",
      { uid: payload.uid },
    )) as IUser;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: "Account is disabled",
      });
    }

    req.user = { ...user };
    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Send 401 so frontend interceptor triggers refresh
    return res.status(401).json({
      success: false,
      error: error.name === "TokenExpiredError" ? "Access token expired" : "Invalid access token",
    });
  }
}
