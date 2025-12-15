import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getUnits = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const dbRes = await db.select("SELECT * FROM units");
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, dbRes.list);
};
export default getUnits;
