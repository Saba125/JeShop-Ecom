import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteUnit = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingUnit = await db.selectSingle("SELECT * FROM units WHERE uid = :uid", {
    uid
  });
  if (!existingUnit) {
    return helpers.sendError(res, "მსგავსი ერთეული ვერ მოიძებნა!");
  }
  const dbRes = await db.delete("DELETE FROM units WHERE uid = :uid", {
    uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "ერთეული წარმატებით წაიშალა!");
};
export default deleteUnit;
