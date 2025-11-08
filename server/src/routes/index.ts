import express from "express";
import UsersRes from "../controllers/users/export";
import { authMiddleware } from "../middlewares/auth";
import { brandImgUploader, categoryImgUploader, productImageUploader } from "../config/multer";
import CategoryRes from "../controllers/categories/export";
import ProductRes from "../controllers/products/export";
import UnitRes from "../controllers/units/export";
import BrandRes from "../controllers/brands/export";
import SalesRes from "../controllers/sales/export";
const Router = express.Router();
// Auth & Users
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("/logout", UsersRes.handleLogOut);
Router.post("/refresh_token", UsersRes.validateRefreshToken);
Router.get("/checkUser", authMiddleware, UsersRes.checkUserInfo);
Router.post("/users", authMiddleware, UsersRes.getUsers);
// Category
Router.put(
  "/category/:uid",
  authMiddleware,
  categoryImgUploader.single("image"),
  CategoryRes.editCategory,
);
Router.post(
  "/category",
  authMiddleware,
  categoryImgUploader.single("image"),
  CategoryRes.createCategory,
);
Router.get("/category", authMiddleware, CategoryRes.getCategories);
Router.delete("/category/:uid", authMiddleware, CategoryRes.deleteCategory);
// Products
Router.post(
  "/product",
  authMiddleware,
  productImageUploader.single("image"),
  ProductRes.addProduct,
);
Router.post("/products/all", authMiddleware, ProductRes.getProducts);
Router.put(
  "/product",
  authMiddleware,
  productImageUploader.single("image"),
  ProductRes.updateProduct,
);
Router.delete("/product/:uid", authMiddleware, ProductRes.deleteProduct);
// Units
Router.post("/units/all", authMiddleware, UnitRes.getUnits);
Router.post("/unit", authMiddleware, UnitRes.addUnit);
Router.put("/unit", authMiddleware, UnitRes.updateUnit);
Router.delete("/unit/:uid", authMiddleware, UnitRes.deleteUnit);

// Brand
Router.post("/brand", authMiddleware, brandImgUploader.single("image"), BrandRes.addBrand);
Router.put("/brand", authMiddleware, brandImgUploader.single("image"), BrandRes.updateBrand);
Router.post("/brands/all", authMiddleware, BrandRes.getBrands);
Router.delete("/brand/:uid", authMiddleware, BrandRes.deleteBrand);
// Sales
Router.post("/sale", authMiddleware, SalesRes.addSale);
export default Router;
