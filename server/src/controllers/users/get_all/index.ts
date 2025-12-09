import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";

const getAllUsersPaginated = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const user = req.user as IUser;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const total = (await db.selectSingle("SELECT COUNT(*) AS count FROM users WHERE uid != :uid", {
    uid: user.uid,
  })) as { count: number };
  const dbRes = await db.select(
    `SELECT uid,username,email,phone,user_type,is_active,email_verified_date,create_date FROM users WHERE uid != :uid LIMIT ${pageSize} OFFSET ${offset}`,
    {
      uid: user.uid,
    },
  );
  helpers.sendSuccess(res, {
    data: dbRes.list,
    pagination: {
      page,
      pageSize,
      total: total.count,
      totalPages: Math.ceil(total.count / pageSize),
    },
  });
};
export default getAllUsersPaginated;
