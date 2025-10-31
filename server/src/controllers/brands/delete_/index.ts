import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteBrand = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingBrand = await db.selectSingle("SELECT * FROM brands WHERE uid = :uid", {
    uid
  });
  if (!existingBrand) {
    return helpers.sendError(res, "მსგავსი ბრენდი ვერ მოიძებნა!");
  }
  const dbRes = await db.delete("DELETE FROM brands WHERE uid = :uid", {
    uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "ბრენდი წარმატებით წაიშალა");
};
export default deleteBrand;
