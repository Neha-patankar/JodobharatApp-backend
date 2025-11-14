import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  createNews,
  getAllNews,

  getNewsByCategory,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/news";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/create", upload.single("image"), createNews);

// 🟢 All news
router.get("/alldata", getAllNews);

// 🟣 Get news by category

router.get("/category/:category", getNewsByCategory);

// 🟡 Update
router.put("/:id", upload.single("image"), updateNews);

// 🔴 Delete
router.delete("/:id", deleteNews);

export default router;
