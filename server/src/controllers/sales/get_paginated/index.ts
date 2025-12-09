import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getPaginatedSales = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const dbRes = await db.select(`
    SELECT
      s.uid as uid,
      s.code AS code,
      s.description,
      s.created_at,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'uid', u.uid,
          'username', u.username,
          'email', u.email,
          'phone', u.phone,
          'user_type', u.user_type,
          'is_active', u.is_active,
          'email_verified_date', u.email_verified_date
        )
      ) AS users,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'uid', p.uid,
          'name', p.name,
          'sale', si.amount,
          'sale_type', si.type,
          'description', p.description,
          'image', p.image,
          'stock', p.stock,
          'brand_uid', p.brand_uid,
          'category_uid', p.category_uid,
          'weight', p.weight,
          'unit_uid', p.unit_uid,
          'price', p.price
        )
      ) AS products
    FROM sales s
     JOIN sales_items si ON si.sale_uid = s.uid
    LEFT JOIN users u ON si.user_uid = u.uid
    LEFT JOIN products p ON si.product_uid = p.uid
    GROUP BY s.code, s.description, s.uid,s.created_at
    LIMIT ${pageSize} OFFSET ${offset}
  `);
  const dbResCount = dbRes.list?.length || 0;
  helpers.sendSuccess(res, {
    data: dbRes.list,
    pagination: {
      page,
      pageSize,
      total: dbResCount,
      totalPages: Math.ceil(dbResCount / pageSize),
    },
  });
};
export default getPaginatedSales;
