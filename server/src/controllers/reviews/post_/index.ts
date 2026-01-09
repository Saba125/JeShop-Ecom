import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { validateSchema } from "../../../lib/validation";
import { reviewsSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";
const addReview = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const user: IUser = req.user as IUser;
  const validateBody = validateSchema(reviewsSchema, body);
  if (!validateBody.success) {
    return helpers.sendSuccess(res, validateBody.error);
  }
  const data = validateBody.data;
  const checkReview = await db.selectSingle("SELECT * FROM reviews WHERE product_uid = :product_uid AND email = :email", {
    product_uid: data.product_uid,
    email: data.email
  });
  if (checkReview) {
    return helpers.sendError(res, "თქვენი შეფასება უკვე დაფიქსირებულია!");
  }
  const dbRes = await db.insert("reviews", {
    username: data.username || user.username,
    email: data.email || user.email,
    product_uid: data.product_uid,
    rating: data.rating,
    description: data.description
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "თქვენი შეფასება წარმატებით დაფიქსირდა!");
};
export default addReview;
