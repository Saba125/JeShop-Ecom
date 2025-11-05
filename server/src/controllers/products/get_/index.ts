import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getProducts = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db!;
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
    LEFT JOIN units u on u.uid = p.unit_uid
    LEFT JOIN brands b on b.uid = p.brand_uid
  `);
  helpers.sendSuccess(res, dbRes.list);
};
export default getProducts;
