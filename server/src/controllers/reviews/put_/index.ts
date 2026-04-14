import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { reviewsSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";

const editReview = async(req:Request, res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const validateBody = validateSchema(reviewsSchema, body);
  if (!validateBody.success) {
    return helpers.sendSuccess(res, validateBody.error);
  }
  const data = validateBody.data;
  const currentReview = await db.selectSingle("SELECT * FROM reviews WHERE uid = :uid", {
    uid: data.uid
  });
  if (!currentReview) {
    return helpers.sendError(res, "ვერ მოიძებნა...სცადეთ მოგვიანებით");
  }
  const dbRes = await db.update("reviews", {
    uid: data.uid,
    description: data.description
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  };
  helpers.sendSuccess(res, "წარმატებით რედაქტირდა!");
};
export default editReview;
