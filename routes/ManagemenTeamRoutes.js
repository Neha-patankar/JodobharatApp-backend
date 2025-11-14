import express from "express";
import upload from "../middleware/uploads.js";
import {
  addMember,
  updateMember,
  deleteMember,
  getMembersByUser,
} from "../controllers/ManagementController.js";

const router = express.Router();

// Add member
router.post("/", upload.single("image"), addMember);

// Get members for logged-in user
router.get("/:memberCode/:memberName/:communityName", getMembersByUser);

// Update / Delete
router.put("/:id", upload.single("image"), updateMember);
router.delete("/:id", deleteMember);

export default router;
