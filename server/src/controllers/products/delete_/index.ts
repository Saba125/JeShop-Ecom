import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteProduct = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingProduct = await db.selectSingle("SELECT * FROM products WHERE uid = :uid", {
    uid
  });
  if (!existingProduct) {
    return helpers.sendError(res, "მსგავსი პროდუქტი ვერ მოიძებნა!");
  }
  const dbRes = await db.delete("DELETE FROM products WHERE uid = :uid", {
    uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "პროდუქტი წარმატებით წაიშალა");
};
export default deleteProduct;
