import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteCategory = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db!;
  const uid = parseInt(req.params.uid);
  const existingCategory = await db.selectSingle("SELECT * FROM category WHERE uid = :uid", {
    uid
  });
  if (!existingCategory) {
    return helpers.sendError(res, "კატეგორია ვერ მოიძებნა!");
  }
  const dbRes = await db.delete("DELETE FROM category WHERE uid = :uid", {
    uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "კატეგორია წარმატებით წაიშალა!");
};
export default deleteCategory;
