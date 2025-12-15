import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";
import { categorySchema, validateSchema } from "../../../lib/validation";
import { ICategory } from "../../../interfaces/category";
import { deleteImage } from "../../../config/multer";
const editCategory = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const image = req.file ? `images/category/${req.file.filename}` : null;
  const validate = validateSchema(categorySchema, body);
  const data = validate.data;
  const uid = parseInt(req.params.uid);
  const existingCategory = (await db.selectSingle("SELECT * FROM category WHERE  uid = :uid", {
    uid,
  })) as ICategory;
  if (!existingCategory) {
    return helpers.sendError(res, `კატეგორია uid-ით '${Number(data?.uid)}' ვერ მოიძებნა`);
  }

  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const checkName = await db.selectSingle(
    "SELECT * FROM category WHERE name = :name and uid != :uid",
    {
      name: data?.name,
      uid: data?.uid,
    },
  );
  if (checkName) {
    return helpers.sendError(res, `კატეგორია სახელად '${data?.name}' უკვე არსებობს!`);
  }
  if (existingCategory.image && image) {
    deleteImage(`category/${existingCategory.image}`);
  }
  const dbRes = await db.update("category", {
    uid,
    name: data?.name,
    url: data?.url,
    description: data?.description,
    image,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "კატეგორია წარმატებით დარედაქტირდა!");
};
export default editCategory;
