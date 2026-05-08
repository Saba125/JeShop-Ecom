import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { addressSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";

const addAddress = async(req: Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
  const user = req.user as IUser;
  const validate = validateSchema(addressSchema, body);
  if (!validate.success) {
    return helpers.sendError(res, validate.error);
  }
  const data = validate.data;
  console.log({
       address_lng:data.address_lng.toFixed(),
    address_lat: data.address_lat
  });
  const checkTheSameAddress = await db.selectSingle("SELECT uid FROM addresses WHERE address_lat = :address_lat AND address_lng = :address_lng AND user_uid = :user_uid", {
    address_lng:data.address_lng.toFixed(),
    address_lat: data.address_lat.toFixed(),
    user_uid: user.uid
  });
  if (checkTheSameAddress) {
    return helpers.sendError(res, "მსგავსი მისამართი უკვე დამატებულია!");
  }
  const dbRes = await db.insert("addresses",  {
    user_uid: user.uid,
    address_text: data.address_text,
    address_lat: data.address_lat,
    address_lng: data.address_lng
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error.message);
  }
  helpers.sendSuccess(res, "მისამართი წარმატებით დაემატა!");
};
export default addAddress;
