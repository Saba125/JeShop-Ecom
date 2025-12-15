import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getBrands = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const dbRes = await db.select("SELECT * FROM brands");
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  };
  helpers.sendSuccess(res, dbRes.list);
};
export default getBrands;
