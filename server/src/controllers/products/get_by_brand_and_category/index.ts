import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";
import { IProduct } from "../../../interfaces/category";
const getProductByBrandAndCategory = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const uid = parseInt(req.params.uid);
  const existingProduct = (await db.selectSingle("SELECT * FROM products WHERE uid = :uid ", {
    uid,
  })) as IProduct;
  if (!existingProduct) {
    return helpers.sendError(res, "მსგავს პროდუქტი ვერ მოიძებნა!");
  }
  const similiarProducts = await db.select(
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
    WHERE p.category_uid = :category_uid AND p.brand_uid = :brand_uid AND p.uid != :current_uid
    GROUP BY p.uid
  `,
    {
      current_uid: uid,
      category_uid: existingProduct.category_uid,
      brand_uid: existingProduct.brand_uid,
    },
  );
  helpers.sendSuccess(res, similiarProducts.list);
};
export default getProductByBrandAndCategory;
