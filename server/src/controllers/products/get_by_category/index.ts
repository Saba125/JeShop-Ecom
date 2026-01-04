import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getProductByCategory = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const name = req.params.name;
  const { filter } = req.body;

  const { priceRange, selectedBrands, selectedPlugTypes, inStock, onSale, sortBy } = filter || {};
  const where: string[] = [];
  const params: Record<string, any> = {
    categoryName: name,
  };
  where.push(`c.name = :categoryName`);
  if (priceRange?.length === 2) {
    where.push(`p.price BETWEEN :minPrice AND :maxPrice`);
    params.minPrice = priceRange[0];
    params.maxPrice = priceRange[1];
  }
  if (selectedBrands?.length > 0) {
    where.push(`b.uid IN (:brandIds)`);
    params.brandIds = selectedBrands;
  }
  if (selectedPlugTypes?.length > 0) {
    where.push(`p.plug_type IN (:plugTypes)`);
    params.plugTypes = selectedPlugTypes;
  }
  if (inStock) {
    where.push(`p.stock > 0`);
  }
  if (onSale) {
    where.push(`si.is_active = 1`);
  }
  let orderBy = `ORDER BY p.created_at DESC`;

  switch (sortBy) {
    case "price-low":
      orderBy = `ORDER BY p.price ASC`;
      break;

    case "price-high":
      orderBy = `ORDER BY p.price DESC`;
      break;

    case "newest":
      orderBy = `ORDER BY p.created_at DESC`;
      break;

    case "popular":
    default:
      orderBy = `ORDER BY p.uid DESC`; // or sales count later
  }
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const dbRes = await db.select(
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

  ${whereClause}

  GROUP BY p.uid
  ${orderBy}
  `,
    params,
  );

  helpers.sendSuccess(res, dbRes.list);
};
export default getProductByCategory;
