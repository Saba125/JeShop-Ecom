import express from "express";
import UsersRes from "../controllers/users/export";
import { authMiddleware } from "../middlewares/auth";
import { categoryImgUploader } from "../config/multer";
import CategoryRes from "../controllers/categories/export";
import ProductRes from "../controllers/products/export";
const Router = express.Router();
// Auth & Users
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("/logout", UsersRes.handleLogOut);
Router.post("/refresh_token", UsersRes.validateRefreshToken);
Router.get("/checkUser", authMiddleware, UsersRes.checkUserInfo);
// Category
Router.put("/category/:uid", authMiddleware, categoryImgUploader.single("image"), CategoryRes.editCategory);
Router.post("/category", authMiddleware, categoryImgUploader.single("image"), CategoryRes.createCategory);
Router.get("/category", authMiddleware, CategoryRes.getCategories);
Router.delete("/category/:uid", authMiddleware, CategoryRes.deleteCategory);
// Products
Router.post("/product", authMiddleware, ProductRes.addProduct);
Router.post("/products/all", authMiddleware, ProductRes.getProducts);

export default Router;
