import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteUser = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingUser = await db.selectSingle("SELECT * FROM users WHERE uid = :uid", {
    uid
  });
  if (!existingUser) {
    return helpers.sendError(res, "იუზერი ვერ მოიძებნა");
  }
  const dbRes = await db.delete("DELETE FROM users WHERE uid = :uid", {
    uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "იუზერი წარმატებით წაიშალა");
};
export default  deleteUser;
