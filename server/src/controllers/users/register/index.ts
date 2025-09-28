import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { registerSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

export const registerUser = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const validateBody = validateSchema(registerSchema, body);
  if (!validateBody.success) {
    return helpers.sendError(res, validateBody.error);
  }
  const data = validateBody.data;
  const hashedPassword = helpers.getCryptoHash(data.password);
  const dbRes = await db.insert("users", {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error);
  }
  helpers.sendSuccess(res, "User registered successfully");
};
