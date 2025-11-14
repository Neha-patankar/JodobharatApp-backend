


import express from "express";
import upload from "../middleware/uploads.js"; // Multer middleware
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} from "../controllers/ClientsController.js";

const router = express.Router();

router.post("/", upload.single("logo"), addClient);
router.get("/", getClients);
router.put("/:id", upload.single("logo"), updateClient);
router.delete("/:id", deleteClient);

export default router;
