import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getUserForSelect = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const dbRes = await db.select("SELECT * FROM users WHERE is_active = 1 AND user_type = 2");
  helpers.sendSuccess(res, dbRes.list);
};
export default getUserForSelect;
