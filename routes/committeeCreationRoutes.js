// routes/managementRoutes.js
import express from "express";
import upload from "../middleware/uploads.js";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/commiteeCreationControllor.js";

const router = express.Router();

// Change this line to expect "image" field
router.post("/", upload.single("image"), addMember);
router.get("/", getMembers);
router.put("/:id", upload.single("image"), updateMember);
router.delete("/:id", deleteMember);

export default router;