import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const addSale = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const checkCode = await db.selectSingle("SELECT * FROM sales WHERE code = :code", {
    code: body.code,
  });
  if (checkCode) {
    return helpers.sendError(res, "ფასდაკლება მსგავსი კოდით უკვე არსებობს");
  }
  const dbRes = await db.insert("sales", {
    code: body.code,
    description: body.description
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  for (const item of body.items) {
    const dbRes1 = await db.insert("sales_items", {
      sale_uid: dbRes.uid,
      user_uid: item.user_uid,
      product_uid: item.product_uid,
      amount: item.amount,
      type: item.type,
      is_active: 1,
    });
    if (dbRes1.error) {
      return helpers.sendError(res, dbRes1.error.message);
    }
  }
  helpers.sendSuccess(res, "ფასდაკლება წარმატებით დაემატა");
};
export default addSale;
