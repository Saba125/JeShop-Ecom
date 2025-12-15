import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getPaginatedBrands = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const totalCount = (await db.selectSingle("SELECT COUNT(*) AS count FROM brands")) as {
    count: number;
  };
  const offset = (page - 1) * pageSize;
  const dbRes = await db.select(`SELECT * FROM brands LIMIT ${pageSize} OFFSET ${offset}`);
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
export default getPaginatedBrands;
