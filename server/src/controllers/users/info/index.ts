import { Request, Response } from "express";
import helpers from "../../../lib/helpers";

export const checkUserInfo = async(req:Request,res:Response) => {
  if (!req.user) {
    return helpers.sendError(res, "იუზერი ვერ მოიძებნა");
  }
  helpers.sendSuccess(res, req.user);
};
