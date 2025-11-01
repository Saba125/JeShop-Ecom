import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { validateSchema } from "../../../lib/validation";
import { productSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
const addProduct = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db!;
  const body = req.body;
  console.log(body);
  const validate = validateSchema(productSchema, body);
  const image = req.file ? `images/products/${req.file.filename}` : null;
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const existingProduct = await db.selectSingle("SELECT * FROM products WHERE name = :name AND category_uid = :category_uid", {
    name: data.name,
    category_uid: data.category_uid
  });
  if (existingProduct) {
    return helpers.sendError(res, "მსგავსი პროდუქტი უკვე არსებობს!");
  }
  const dbRes = await db.insert("products", {
    name: data.name,
    description: data.description,
    image,
    stock: parseInt(data.stock!),
    category_uid: data.category_uid,
    weight: parseInt(data.weight),
    price: parseInt(data.price) * 100,
    unit_uid: data.unit_uid,
    brand_uid: data.brand_uid
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "პროდუქტი წარმატებით დაემატა!");

};
export default addProduct;
