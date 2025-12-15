import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { unitSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

const addUnit = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const validate = validateSchema(unitSchema, body);
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const checkName = await db.selectSingle("SELECT * FROM units WHERE name = :name", {
    name:data.name
  });
  if (checkName) {
    return helpers.sendError(res, "მსგავსი ერთეული უკვე არსებობს!");
  }
 const dbRes = await db.insert("units", {
  name: data.name,
  description: data.description || null
 });
 if (dbRes.error) {
  return helpers.sendError(res, dbRes.error.message);
 }
 helpers.sendSuccess(res, "ერთეული წარმატებით დაემატა");
};
export default addUnit;
