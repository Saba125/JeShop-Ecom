import multer from "multer";
import { brandStorage, categoryStorage, productStorage, userStorage } from "./image_storage";
import path from "path";
import fs from "fs";
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/mkv", "video/webm", "video/avi"];

  if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

// Configure multer
const userImgUploader = multer({
  storage: userStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size 100MB
  },
  fileFilter,
});

const categoryImgUploader = multer({
  storage: categoryStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size 100MB
  },
  fileFilter,
});
const brandImgUploader = multer({
  storage: brandStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size 100MB
  },
  fileFilter,
});
function deleteImage(file_name: string | undefined) {
  if (!file_name) return;
  const filePath = path.join("public/", file_name);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
}
const productImageUploader = multer({
  storage: productStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size 100MB
  },
  fileFilter,
});

export { userImgUploader, categoryImgUploader, deleteImage,productImageUploader, brandImgUploader };
