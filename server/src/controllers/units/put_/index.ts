import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { unitSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

const updateUnit = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db!;
  const body = req.body;
  const validate = validateSchema(unitSchema, body);
  if (validate.error) {
    return helpers.sendError(res, validate.error);
  };
  const data = validate.data;
  const existingUnit = await db.selectSingle("SELECT * FROM units WHERE uid = :uid", {
    uid: data?.uid
  });
  if (!existingUnit) {
    return helpers.sendError(res, "მსგავსი ერთეული ვერ მოიძებნა!");
  }
  const checkName = await db.selectSingle("SELECT * FROM units WHERE uid != :uid AND name = :name", {
    uid: data?.uid,
    name: data?.name
  });
  if (checkName) {
    return helpers.sendError(res, `ერთეული სახელად '${data?.name}' უკვე არსებობს!`);
  }
  const dbRes = await db.update("units", {
    name: data?.name,
    description: data?.description || null
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "ერთეული წარმატებით რედაქტირდა!");

};
export default updateUnit;
