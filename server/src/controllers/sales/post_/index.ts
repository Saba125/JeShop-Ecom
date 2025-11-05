import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { saleSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

const addSale = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const validate = validateSchema(saleSchema, body);
  const data = validate.data;
  const checkCode = await db.selectSingle("SELECT * FROM sales WHERE code = :code");
  if (checkCode) {
    return helpers.sendError(res, "ფასდაკლება მსგავსი კოდით უკვე არსებობს");
  }
  const dataArr = data || [];
  for (const item of dataArr) {
    const dbRes = await db.insert("sales", {
      user_uid:item.user_uid,
      product_uid: item.product_uid,
      amount: item.amount,
      type: item.type,
      description: item.description,
      code: item.code,
      is_active: 1
    });
    if (dbRes.error) {
      return helpers.sendError(res, dbRes.error.message);
    }
  }
  helpers.sendSuccess(res, "წარმატებით დაემატა");
};
export default addSale;
