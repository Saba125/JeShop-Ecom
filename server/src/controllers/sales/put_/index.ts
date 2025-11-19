import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const editSale = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const currentSale = await db.selectSingle("select * from sales where uid = :uid", {
    uid: body.uid,
  });
  if (!currentSale) {
    return helpers.sendError(res, "ფასდაკლება ვერ მოიძებნა!");
  }
  const checkName = await db.selectSingle(
    "select * from sales where code = :code and uid != :uid",
    {
      code: body.code,
      uid: body.uid,
    },
  );
  if (checkName) {
    return helpers.sendError(res, "მსგავსი ფასდაკლება უკვე არსებობს!");
  }
  const deleteSaleItems = await db.delete("delete from sales_items where sale_uid = :sale_uid", {
    sale_uid: body.uid
  });
  if (deleteSaleItems.error) {
    return helpers.sendError(res, deleteSaleItems.error.message);
  }
  const editSale = await db.update("sales", {
    uid: body.uid,
    code: body.code
  });
  if (editSale.error) {
    return helpers.sendError(res, editSale.error.message);
  }
    for (const item of body.items) {
    const dbRes1 = await db.insert("sales_items", {
      sale_uid: body.uid,
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
  helpers.sendSuccess(res, "ფასდაკლება წარმატებით რედაქტირდა!");

};
