import express from "express";
import multer from "multer";
import {
  createCommunity,
  activateCommunity,
  getAllCommunities,
  updateCommunity,
  deleteCommunity,
} from "../controllers/communityController.js";

const router = express.Router();

// Use multer to handle file uploads (logo)
const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("logo"), createCommunity);
// router.patch("/activate/:id", activateCommunity);
// router.get("/", getAllCommunities);
// router.put("/:id", upload.single("logo"), updateCommunity);
// router.delete("/:id", deleteCommunity);


router.post("/", upload.single("logo"), createCommunity);
router.patch("/activate/:id", activateCommunity);
router.get("/", getAllCommunities);
router.put("/:id", upload.single("logo"), updateCommunity);
router.delete("/:id", deleteCommunity);


export default router;
