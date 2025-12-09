import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getProductsPaginated = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db!;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const totalCount = await db.selectSingle("SELECT count(*) AS total FROM products") as {total: number};
  const total = totalCount.total;
  const dbRes = await db.select(`
        SELECT
            p.*,
            p.price,
            JSON_OBJECT(
                'uid', c.uid,
                'name', c.name,
                'description', c.description,
                'image', c.image
            ) as category,
            JSON_OBJECT(
                'uid', u.uid,
                'name', u.name
            ) as unit,
            JSON_OBJECT(
                'uid', b.uid,
                'name', b.name,
                'description', b.description,
                'image', b.image
            ) as brand
        FROM products p
        LEFT JOIN category c ON c.uid = p.category_uid
        LEFT JOIN units u ON u.uid = p.unit_uid
        LEFT JOIN brands b ON b.uid = p.brand_uid
        LIMIT ${pageSize}
         OFFSET ${offset}
    `);
  helpers.sendSuccess(res, {
    data: dbRes.list,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
};
export default getProductsPaginated;
