import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { productSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { IProduct } from "../../../interfaces/category";
import { deleteImage } from "../../../config/multer";

const updateProduct = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db!;
  const body = req.body;
  const validate = validateSchema(productSchema, body);
  const image = req.file ? `images/products/${req.file.filename}` : null;
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const checkName: IProduct = (await db.selectSingle(
    "SELECT * FROM products WHERE uid != :uid AND name = :name",
    {
      uid: parseInt(data.uid!),
      name: data.name,
    },
  )) as IProduct;
  if (checkName) {
    return helpers.sendError(res, "მსგავსი პროდუქტი უკვე არსებობს");
  }
  const existingProduct = (await db.selectSingle("SELECT * FROM products WHERE uid = :uid", {
    uid: data.uid,
  })) as IProduct;
  if (existingProduct?.image) {
    deleteImage(existingProduct.image);
  }
  const dbRes = await db.update("products", {
    uid: data.uid,
    name: data.name,
    description: data.description,
    stock: data.stock,
    category_uid: data.category_uid,
    weight: data.weight,
    unit_uid: data.unit_uid,
    brand_uid: data.brand_uid,
    price: data.price,
    image,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "პროდუქტი რედაქტირდა");
};
export default updateProduct;
