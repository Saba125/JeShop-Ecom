import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";
import { loginSchema, validateSchema } from "../../../lib/validation";
import helpers from "../../../lib/helpers";
import { IUser } from "../../../interfaces/user";
import checkDevice from "../../../lib/check_device";
import { detect } from "detect-browser";
import geoip from "geoip-lite";
import { IEmailNotifications } from "../../../interfaces/email_notifications";
export const login = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const body = req.body;
  const validateBody = validateSchema(loginSchema, body);
  const data = validateBody.data;
  const userAgent = req.headers["user-agent"] as string;
  const checkDeviceType = checkDevice(userAgent);
  const userPCData = detect(userAgent);
  const ipAddress = body.ip_address;
  const geo = geoip.lookup(ipAddress);
  if (!validateBody.success) {
    return helpers.sendError(res, validateBody.error);
  }
  const existingUser = (await db.selectSingle("select * from users where email = :email", {
    email: data?.email,
  })) as IUser;
  if (!existingUser) {
    return helpers.sendError(res, "User not found");
  }
  if (!existingUser.is_active) {
    return helpers.sendError(res, "User is not active");
  }
  const hashedPassword = helpers.getCryptoHash(data!.password);
  if (hashedPassword !== existingUser.password) {
    // შევქმანთ ჩაფლავებული ლოგი
    await db.insert("user_logs", {
      user_uid: existingUser.uid,
      status: "failed",
      ip_address: ipAddress,
      browser: userPCData?.name,
      city: geo?.city,
      country: geo?.country,
      device: checkDeviceType ? "mobile" : "desktop",
    });
    return helpers.sendError(res, "Invalid password");
  }
  const accessToken = helpers.createToken({ uid: existingUser.uid }, "1h");
  const refreshToken = helpers.createToken({ uid: existingUser.uid }, "60d");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = existingUser;

  // შევქმანთ წარმატებული ლოგი
  const dbRes = await db.insert("user_logs", {
    user_uid: existingUser.uid,
    status: "success",
    ip_address: ipAddress,
    browser: userPCData?.name,
    city: geo?.city,
    country: geo?.country,
    device: checkDeviceType ? "mobile" : "desktop",
  });
  if (dbRes.error) {
    return helpers.sendError(res, dbRes.error);
  }
  const checkEmailNotifications = (await db.selectSingle(
    "select * from email_notifications where user_uid = :uid", {
      uid: existingUser.uid
    }
  )) as IEmailNotifications;

  if (checkEmailNotifications && checkEmailNotifications.login_notification) {
    // Send login notification
  }

  helpers.sendSuccess(res, { accessToken, refreshToken, user });
};
