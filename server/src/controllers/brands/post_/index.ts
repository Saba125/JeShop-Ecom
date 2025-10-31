import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { brandSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

const addBrand = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const validate = validateSchema(brandSchema, body);
  const data = validate.data;
  const checkName = await db.selectSingle("SELECT * FROM brand WHERE name = :name", {
    name:data?.name
  });
  if (checkName) {
    return helpers.sendError(res, "ბრენდი მსგავსი სახელით უკვე არსებობს");
  }
  const image = req.file ? `images/brands/${req.file.filename}` : null;
  const dbRes = await db.insert("brands", {
    name: data?.name,
    description: data?.description,
    image
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  } 
  helpers.sendSuccess(res, "ბრენდი წარმატებით დაემატა!");
};
export default addBrand;
