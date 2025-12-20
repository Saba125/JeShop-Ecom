import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getSingleProduct = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db!;
  const uid = req.params.uid;
  const dbRes = await db.selectSingle(
    `
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
    WHERE p.uid = :uid
    GROUP BY p.uid
  `,
    {
      uid,
    },
  );
  if (!dbRes) {
    return helpers.sendError(res, "მსგავსი პროდუქტი ვერ მოიძებნა");
  }
  console.log(dbRes);
  helpers.sendSuccess(res, dbRes);
};
export default getSingleProduct;
