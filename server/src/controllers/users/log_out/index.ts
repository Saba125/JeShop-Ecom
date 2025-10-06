import { Request, Response } from "express";
import helpers from "../../../lib/helpers";

const handleLogOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/refresh_token",
    });
    helpers.sendSuccess(res, { message: "Logged out successfully" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    helpers.sendError(res, "An error occurred during logout");
  }
};
export default handleLogOut;
