import express from "express";
import UsersRes from "../controllers/users/export";
import { authMiddleware } from "../middlewares/auth";
import { categoryImgUploader } from "../config/multer";
import CategoryRes from "../controllers/categories/export";
const Router = express.Router();
// Auth & Users
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("/logout", UsersRes.handleLogOut);
Router.post("/refresh_token", UsersRes.validateRefreshToken);
Router.get("/checkUser", authMiddleware, UsersRes.checkUserInfo);
// Category
Router.post("/category", authMiddleware, categoryImgUploader.single("image"), CategoryRes.createCategory);

export default Router;
