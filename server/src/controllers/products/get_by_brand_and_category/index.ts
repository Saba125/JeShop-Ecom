import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";
import { IProduct } from "../../../interfaces/category";

const getProductByBrandAndCategory = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingProduct = await db.selectSingle("SELECT * FROM products WHERE uid = :uid ", {
    uid
  }) as IProduct;
  if (!existingProduct) {
    return helpers.sendError(res, "მსგავს პროდუქტი ვერ მოიძებნა!");
  }
  const similiarProducts = await db.select("SELECT * FROM products WHERE category_uid = :category_uid AND brand_uid = :brand_uid", {
      category_uid: existingProduct.category_uid,
      brand_uid: existingProduct.brand_uid
  });
  helpers.sendSuccess(res, similiarProducts.list);

};
export default getProductByBrandAndCategory;
