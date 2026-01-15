import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import helpers from "../../../lib/helpers";

const getReviews = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const product_uid = req.params.product_uid;

  const dbRes = await db.select(`
    SELECT
      r.*,
      CASE
        WHEN u.email IS NULL THEN NULL
        ELSE JSON_OBJECT(
          'uid', u.uid,
          'username', u.username,
          'email', u.email,
          'phone', u.phone,
          'user_type', u.user_type,
          'is_active', u.is_active,
          'email_verified_date', u.email_verified_date
        )
      END AS user
    FROM reviews r
    LEFT JOIN users u ON u.email = r.email
    WHERE r.product_uid = :product_uid
  `, {
    product_uid
  });

  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }

  helpers.sendSuccess(res, dbRes.list);
};

export default getReviews;
