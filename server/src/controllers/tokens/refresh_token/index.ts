/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import helpers from "../../../lib/helpers";
import jwt from "jsonwebtoken";
import config from "../../../lib/config";
export const validateRefreshToken = (req:Request,res:Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return helpers.sendError(res, {accessToken: ""});
  try {
    const payload: any = jwt.verify(token, config.JWT_SECRET);
    const accessToken = helpers.createToken({uid: payload?.uid}, "15m");
    helpers.sendSuccess(res, {accessToken});
  } catch (_error:any) {
    helpers.sendError(res, {accessToken: ""});
  }
};
