import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";

const changePassword = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const hashedCurrentPass = helpers.getCryptoHash(body.password);
  if (body.newPassword !== body.repeatPassword) {
    return helpers.sendError(res, "Repeat password is incorrect");
  }
  const existingUser = await db.selectSingle("SELECT password FROM users WHERE uid = :uid", {
    uid: body.uid
  }) as IUser;
  if (!existingUser) {
    return helpers.sendError(res, "User not found");
  }
  if (hashedCurrentPass !== existingUser.password) {
    return helpers.sendError(res, "Password is incorrect");
  }
  const newPass = helpers.getCryptoHash(body.newPassword);
  const dbRes = await db.update("users", {
    uid: body.uid,
    password: newPass
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
};
