import express from "express";
import UsersRes from "../controllers/users/export";
const Router = express.Router();
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("refresh_token", UsersRes.validateRefreshToken);
export default Router;
