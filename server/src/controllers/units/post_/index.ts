import { Request, Response } from "express";
import { IDbTools } from "../../../db/db_tools";

const addUnit = async(req:Request,res:Response) => {
  const db:IDbTools = req.app.locals.db;
  const body = req.body;
};
