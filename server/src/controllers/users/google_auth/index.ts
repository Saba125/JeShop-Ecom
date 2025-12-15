import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import config from "../../../lib/config";
import helpers from "../../../lib/helpers";
import { IDbTools } from "../../../db/db_tools";
const client = new OAuth2Client(config.CLIENT_ID);
const googleAuth = async (req: Request, res: Response) => {
  const db: IDbTools = req.app.locals.db;
  const { credential } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    return helpers.sendError(res, "Invalid Google token");
  }
  const { email, name, sub } = payload;
  const existingUser = await db.selectSingle("select * from users where email = :email", { email });
  if (!existingUser) {
    const dbRes = await db.insert("users", {
      username: name,
      email: email,
      password: helpers.getCryptoHash(sub),
      phone: null,
    });
    if (dbRes.error) {
      return helpers.sendError(res, dbRes.error.message);
    }
  }
  const user: any = await db.selectSingle("select * from users where email = :email", { email });
  const accessToken = helpers.createToken({ uid: user.uid }, "1h");
  const refreshToken = helpers.createToken({ uid: user.uid }, "60d");
  const { password, ...safeUser } = user;
  helpers.sendSuccess(res, {
    accessToken,
    refreshToken,
    user,
  });
};
export default googleAuth;
