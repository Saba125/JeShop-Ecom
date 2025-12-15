import multer from "multer";
import path from "path";
import { Request } from "express";
const userStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let folder = "";

    if (file.mimetype.startsWith("image/")) {
      folder = path.join(__dirname, "../../public/images/clients");
    }

    cb(null, folder);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const categoryStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let folder = "";

    if (file.mimetype.startsWith("image/")) {
      folder = path.join(__dirname, "../../public/images/category");
    }

    cb(null, folder);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const productStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let folder = "";

    if (file.mimetype.startsWith("image/")) {
      folder = path.join(__dirname, "../../public/images/products");
    }

    cb(null, folder);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const brandStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let folder = "";

    if (file.mimetype.startsWith("image/")) {
      folder = path.join(__dirname, "../../public/images/brands");
    }

    cb(null, folder);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export {
  userStorage,
  categoryStorage,
  productStorage,
  brandStorage
};
