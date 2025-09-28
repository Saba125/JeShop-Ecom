import express from "express";
import UsersRes from "../controllers/users/export";
const Router = express.Router();
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);

export default Router;
