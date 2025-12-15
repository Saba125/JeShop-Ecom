import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { validateSchema } from "../../../lib/validation";
import { userEditSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
const editUser = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const validate = validateSchema(userEditSchema, body);
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  const existingUser = await db.selectSingle("SELECT * FROM users WHERE uid = :uid", {
    uid: data.uid
  });
  if (!existingUser) {
    return helpers.sendError(res, "იუზერი ვერ მოიძებნა!");
  }
  const checkMail = await db.selectSingle("SELECT * FROM users WHERE email = :email AND uid != :uid", {
    email: data.email
  });
  if (checkMail) {
    return helpers.sendError(res, "მსგავსი იუზერი უკვე არსებობს!");
  }
  const dbRes = await db.update("users", {
    uid: data.uid,
    username: data.username,
    email: data.email,
    phone: data.phone,
    user_type: data.user_type,
    is_active: data.status,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "იუზერი წარმატებით დარედაქტირდა");

};
export default editUser;
