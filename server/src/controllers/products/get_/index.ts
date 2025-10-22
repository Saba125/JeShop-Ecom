import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getProducts = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db!;
  const dbRes = await db.select(`
    SELECT
     p.*,
     JSON_OBJECT(
     'uid', c.uid,
     'name', c.name,
     'description', c.description,
     'image', c.image
     ) as category
    FROM products p
    LEFT JOIN category c ON c.uid = p.category_uid
  `);
  helpers.sendSuccess(res, dbRes.list);
};
export default getProducts;
