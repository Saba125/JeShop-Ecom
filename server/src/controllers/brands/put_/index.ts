import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { brandSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import z from "zod";
import { deleteImage } from "../../../config/multer";

const updateBrand = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  console.log(body);
  const validate = validateSchema(brandSchema, body);
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const checkExistingBrand = (await db.selectSingle("SELECT * FROM brands WHERE uid = :uid", {
    uid: data?.uid,
  })) as z.infer<typeof brandSchema>;
  if (!checkExistingBrand) {
    return helpers.sendError(res, "მსგავსი ბრენდი ვერ მოიძებნა");
  }
  const checkName = await db.selectSingle(
    "SELECT * FROM brands WHERE name = :name AND uid != :uid",
    {
      uid: data?.uid,
      name: data?.name,
    },
  );

  const image = req.file ? `images/brands/${req.file.filename}` : null;
  if (image && checkExistingBrand.image) {
    deleteImage(checkExistingBrand.image);
  }
  const dbRes = await db.update("brands", {
    uid: data?.uid,
    name: data?.name,
    description: data?.description,
    image,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "ბრენდი წარმატებით რედაქტირდა");
};
export default updateBrand;
