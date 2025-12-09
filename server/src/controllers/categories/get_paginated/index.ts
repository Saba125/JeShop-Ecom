import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getPaginatedCategories = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const totalCount =  await db.selectSingle("SELECT COUNT(*) as count FROM category") as {count: number};
  const dbRes = await db.select(`SELECT * FROM category LIMIT ${pageSize} OFFSET ${offset} `);
  helpers.sendSuccess(res, {
    data: dbRes.list,
    pagination: {
      page,
      pageSize,
      total: totalCount.count,
      totalPages: Math.ceil(totalCount.count / pageSize)
    }
  });
};
export default getPaginatedCategories;
