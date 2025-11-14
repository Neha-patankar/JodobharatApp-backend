import express from "express";
import upload from "../middleware/uploads.js";
import {
  getCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/CertificaatesControoler.js";

const router = express.Router();

router.post("/", upload.single("image"), addCertificate);
router.get("/", getCertificate);
router.put("/:id", upload.single("image"), updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;
