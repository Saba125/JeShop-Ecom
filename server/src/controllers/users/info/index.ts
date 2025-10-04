import { Request, Response } from "express";
import helpers from "../../../lib/helpers";

export const checkUserInfo = async(req:Request,res:Response) => {
  helpers.sendSuccess(res, req.user);
};
