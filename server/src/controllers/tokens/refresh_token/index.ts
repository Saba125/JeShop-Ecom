import { Request, Response } from "express";
import helpers from "../../../lib/helpers";
import jwt from "jsonwebtoken";
import config from "../../../lib/config";

export const validateRefreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Refresh token not found"
    });
  }
  try {
    const payload: any = jwt.verify(token, config.JWT_SECRET);

    // Create new access token
    const accessToken = helpers.createToken({ uid: payload?.uid }, "15m");

    // OPTIONAL: Create new refresh token (token rotation for better security)
    const newRefreshToken = helpers.createToken({ uid: payload?.uid }, "7d");

    // Set new refresh token in httpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    helpers.sendSuccess(res, {
      data: {
        accessToken
      }
    });
  } catch (error: any) {
    // Clear invalid refresh token
    res.clearCookie("refreshToken");

    return res.status(401).json({
      success: false,
      error: error.name === "TokenExpiredError"
        ? "Refresh token expired"
        : "Invalid refresh token"
    });
  }
};
