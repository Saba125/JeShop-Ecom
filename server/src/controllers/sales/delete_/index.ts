import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const deleteSale = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const dbRes = await db.delete("delete from sales where uid = :uid", {
    uid,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  const dbRes1 = await db.delete("delete from sales_items where sale_uid = :sale_uid", {
    sale_uid: uid,
  });
  if (dbRes1.error) {
    return helpers.sendError(res, dbRes1.error.message);
  }
  helpers.sendSuccess(res, "ფასდაკლება წარმატებით წაიშალა!");
};
export default deleteSale;
