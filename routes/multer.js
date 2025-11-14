import express from "express";
import upload from "../middleware/upload.js";
import { addClient } from "../controllers/ClientsController.js";
import { addMember } from "../controllers/ManagementController.js";
import { createProduct  } from "../controllers/productController.js";
import { addCertificate } from "../controllers/CertificaatesControoler.js"
import { saveContactInfo } from "../controllers/contactController.js"
import { createCommunity } from "../controllers/communityController.js"

const router = express.Router();

router.post("/clients", upload.single("logo"), addClient);
router.post("/teammanagement", upload.single("image"), addMember);
router.post("/contact", upload.single("image"), saveContactInfo);
router.post("/community", upload.single("logoPath"), createCommunity );
router.post("/certificates", upload.single("image"), addCertificate );
router.post("/products", upload.single("image"), createProduct );
router.post("/contact-slider", upload.single("slider"), addSlider);
router.post("/services", upload.single("image"), addService);

export default router;
