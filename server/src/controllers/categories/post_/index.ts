import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { validateSchema } from "../../../lib/validation";
import { categorySchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { ICategory } from "../../../interfaces/category";
const createCategory = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const validate = validateSchema(categorySchema, body);
  const image = req.file  ? `images/category/${req.file.filename}` : null;
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const existingCategory = await db.selectSingle("select * from category where name = :name", {
    name: data?.name,
  }) as ICategory;
  if (existingCategory) {
    return helpers.sendError(res, `კატეგორია სახელით '${data?.name}' უკვე არსებობს`);
  }
  const dbRes = await db.insert("category", {
    name: data.name,
    url: data.url,
    description: data.description || "",
    image: image
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "Category created successfully");
};
export default createCategory;
