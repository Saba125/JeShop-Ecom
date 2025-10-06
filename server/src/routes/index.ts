import express from "express";
import UsersRes from "../controllers/users/export";
import { authMiddleware } from "../middlewares/auth";
const Router = express.Router();
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("/logout", UsersRes.handleLogOut);
Router.post("/refresh_token", UsersRes.validateRefreshToken);
Router.get("/checkUser", authMiddleware, UsersRes.checkUserInfo);


export default Router;
