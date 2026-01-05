import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import config from "../../../lib/config";
import helpers from "../../../lib/helpers";
import { IDbTools } from "../../../db/db_tools";

const client = new OAuth2Client(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  "postmessage" // Important: use "postmessage" for auth-code flow
);

const googleAuth = async (req: Request, res: Response) => {
  try {
    const db: IDbTools = req.app.locals.db;
    const { credential } = req.body;

    let payload;

    // Check if it's an authorization code (starts with "4/" or contains "/")
    if (credential.startsWith('4/') || credential.includes('/')) {
      console.log('Processing authorization code...');

      // Exchange authorization code for tokens
      const { tokens } = await client.getToken(credential);

      if (!tokens.id_token) {
        return helpers.sendError(res, "No ID token received from Google");
      }

      // Verify the ID token
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: config.CLIENT_ID,
      });

      payload = ticket.getPayload();
    } else {
      console.log('Processing ID token...');

      // It's already an ID token - verify directly
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: config.CLIENT_ID,
      });

      payload = ticket.getPayload();
    }

    if (!payload || !payload.email) {
      return helpers.sendError(res, "Invalid Google token - no email found");
    }

    const { email, name, sub } = payload;

    // Check if user exists
    const existingUser = await db.selectSingle(
      "select * from users where email = :email",
      { email }
    );

    if (!existingUser) {
      console.log('Creating new user...');

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

    // Get user data
    const user: any = await db.selectSingle(
      "select * from users where email = :email",
      { email }
    );

    if (!user) {
      return helpers.sendError(res, "Failed to retrieve user data");
    }

    // Create tokens
    const accessToken = helpers.createToken({ uid: user.uid }, "1h");
    const refreshToken = helpers.createToken({ uid: user.uid }, "60d");

    // Remove password from response
    const { password, ...safeUser } = user;

    helpers.sendSuccess(res, {
      accessToken,
      refreshToken,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Google auth error:", error);
    return helpers.sendError(res, error.message || "Authentication failed");
  }
};

export default googleAuth;
