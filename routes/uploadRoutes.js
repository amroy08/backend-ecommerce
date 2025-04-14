import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

const router = express.Router();

// 1️⃣ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2️⃣ Cloudinary storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce", // You can change the folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "scale" }], // Optional image resize
  },
});

const upload = multer({ storage });

// 3️⃣ Upload route
router.post("/", upload.single("image"), (req, res) => {
  if (req.file && req.file.path) {
    res.status(200).json({
      message: "Image uploaded to Cloudinary successfully",
      image: req.file.path, // This is the secure Cloudinary URL
      public_id: req.file.filename,
    });
  } else {
    res.status(400).json({ message: "Image upload failed" });
  }
});

export default router;
