import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getProducts = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db!;
  const body = req.body;
  const filter = [];
  if (body.brand) {
    filter.push("b.name = :name");
  }
  if (body.stock_available) {
    filter.push("p.stock > 0");
  }
  const shouldApplyFilter = filter.length > 0 ? ` where ${filter.join("and")}` : null;
  console.log(shouldApplyFilter);
  const dbRes = await db.select(`
       SELECT
      p.uid,
      p.image,
      p.stock,
      ANY_VALUE(p.name) AS name,
      ANY_VALUE(p.price) AS price,
      p.created_at,
      ANY_VALUE(
        JSON_OBJECT(
          'uid', c.uid,
          'name', c.name,
          'description', c.description,
          'image', c.image
        )
      ) AS category,

      COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'uid', si.uid,
            'sale_uid', si.sale_uid,
            'user_uid', si.user_uid,
            'product_uid', si.product_uid,
            'amount', si.amount,
            'type', si.type,
            'is_active', si.is_active,
            'created_at', si.created_at
          )
        ),
        JSON_ARRAY()
      ) AS sales_items,

      ANY_VALUE(
        JSON_OBJECT(
          'uid', u.uid,
          'name', u.name
        )
      ) AS unit,

      ANY_VALUE(
        JSON_OBJECT(
          'uid', b.uid,
          'name', b.name,
          'description', b.description,
          'image', b.image
        )
      ) AS brand

    FROM products p
    LEFT JOIN category c ON c.uid = p.category_uid
    LEFT JOIN units u ON u.uid = p.unit_uid
    LEFT JOIN brands b ON b.uid = p.brand_uid
    LEFT JOIN sales_items si ON si.product_uid = p.uid

    GROUP BY p.uid
  `);
  helpers.sendSuccess(res, dbRes.list);
};
export default getProducts;
