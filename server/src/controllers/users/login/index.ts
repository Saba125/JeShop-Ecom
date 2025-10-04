import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { loginSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";

export const login = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const validateBody = validateSchema(loginSchema, body);
  const data = validateBody.data;
  if (!validateBody.success) {
    return helpers.sendError(res, validateBody.error);
  }
  const existingUser = (await db.selectSingle("select * from users where email = :email", {
    email: data?.email,
  })) as IUser;
  const { password, ...user } = existingUser;
  if (!existingUser) {
    return helpers.sendError(res, "User not found");
  }
  if (!existingUser.is_active) {
    return helpers.sendError(res, "User is not active");
  }
  const hashedPassword = helpers.getCryptoHash(data!.password);
  if (hashedPassword !== existingUser.password) {
    return helpers.sendError(res, "Invalid password");
  }
  const accessToken = helpers.createToken({ uid: existingUser.uid }, "15m");
  const refreshToken = helpers.createToken({ uid: existingUser.uid }, "1d");
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/refresh_token",
  });
  helpers.sendSuccess(res, { accessToken, user:existingUser });
};
