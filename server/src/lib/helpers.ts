/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import crypto from "crypto";
import config from "./config";
async function sendSuccess(res: Response, data: any, status: number = 200) {
  try {
    const resp = typeof data === "string" ? { message: data } : data;
    res.status(status).json(resp);
  } catch (error) {
    console.error("Error in sendSuccess:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function sendError(res: Response, error: any, status: number = 500) {
  try {
    const errorMessage = typeof error === "string" ? { error: error } : error;
    res.status(status).json(errorMessage);
  } catch (err) {
    console.error("Error in sendError:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
function getCryptoHash(data: string) {
  return crypto.createHash("sha256").update(data, "utf8").digest("hex");
}
function createToken(payload: object, expiresIn: SignOptions["expiresIn"]) {
  const secret: Secret = config.JWT_SECRET as Secret;

  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
}
const helpers = {
  sendSuccess,
  sendError,
  getCryptoHash,
  createToken,
};

export default helpers;
