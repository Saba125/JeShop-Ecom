import express from "express";
import UsersRes from "../controllers/users/export";
import { authMiddleware } from "../middlewares/auth";
import { brandImgUploader, categoryImgUploader, productImageUploader } from "../config/multer";
import CategoryRes from "../controllers/categories/export";
import ProductRes from "../controllers/products/export";
import UnitRes from "../controllers/units/export";
import BrandRes from "../controllers/brands/export";
import SalesRes from "../controllers/sales/export";
import googleAuth from "../controllers/users/google_auth";
const Router = express.Router();
// Auth & Users
Router.post("/register", UsersRes.registerUser);
Router.post("/login", UsersRes.login);
Router.post("/logout", UsersRes.handleLogOut);
Router.post("/refresh_token", UsersRes.validateRefreshToken);
Router.get("/checkUser", authMiddleware, UsersRes.checkUserInfo);
Router.post("/users", authMiddleware, UsersRes.getUsers);
Router.get("/users/all/paginated", authMiddleware, UsersRes.getAllUsersPaginated);
Router.put("/user", authMiddleware, UsersRes.editUser);
Router.delete("/user/:uid", authMiddleware, UsersRes.deleteUser);

// Google Auth

Router.post("/auth/google/callback", googleAuth);
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
Router.get("/category/paginated", authMiddleware, CategoryRes.getPaginatedCategories);
Router.get("/category", authMiddleware, CategoryRes.getCategories);
Router.delete("/category/:uid", authMiddleware, CategoryRes.deleteCategory);
// Products
Router.post(
  "/product",
  authMiddleware,
  productImageUploader.single("image"),
  ProductRes.addProduct,
);
Router.get("/products/similiar", ProductRes.getProductByBrandAndCategory);
Router.get("/products/paginated", authMiddleware, ProductRes.getProductsPaginated);
Router.post("/products/all", authMiddleware, ProductRes.getProducts);
Router.put(
  "/product",
  authMiddleware,
  productImageUploader.single("image"),
  ProductRes.updateProduct,
);
Router.get("/product/:uid", authMiddleware, ProductRes.getSingleProduct);
Router.delete("/product/:uid", authMiddleware, ProductRes.deleteProduct);
// Units
Router.post("/units/all", authMiddleware, UnitRes.getUnits);
Router.post("/unit", authMiddleware, UnitRes.addUnit);
Router.put("/unit", authMiddleware, UnitRes.updateUnit);
Router.delete("/unit/:uid", authMiddleware, UnitRes.deleteUnit);

// Brand
Router.get("/brands/paginated", authMiddleware, BrandRes.getPaginatedBrands);
Router.post("/brand", authMiddleware, brandImgUploader.single("image"), BrandRes.addBrand);
Router.put("/brand", authMiddleware, brandImgUploader.single("image"), BrandRes.updateBrand);
Router.post("/brands/all", authMiddleware, BrandRes.getBrands);
Router.delete("/brand/:uid", authMiddleware, BrandRes.deleteBrand);
// Sales
Router.get("/sales/paginated", authMiddleware, SalesRes.getPaginatedSales);
Router.post("/sale", authMiddleware, SalesRes.addSale);
Router.get("/sales/all", authMiddleware, SalesRes.getSales);
Router.delete("/sale/:uid", authMiddleware, SalesRes.deleteSale);

export default Router;
