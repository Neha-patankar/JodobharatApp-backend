import express from "express";
import upload from "../middleware/uploads.js"; // multer
import {
  getServices,
  addService,
  updateService,
  deleteService
} from "../controllers/ServiceController.js";

const router = express.Router();

router.post("/", upload.single("image"), addService);
router.get("/", getServices);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

export default router;
