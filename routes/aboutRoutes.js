


// // routes/aboutRoutes.js
// import express from 'express';
// import {
//   createAbout,
//   getAbout,
//   updateAbout,
//   deleteAbout
// } from '../controllers/aboutController.js';

// const router = express.Router();

// // Routes
// router.post('/', createAbout);
// router.get('/', getAbout);
// router.put('/:id', updateAbout);
// router.delete('/:id', deleteAbout);

// export default router;




import express from "express";
import {
  createAbout,
  updateAbout,
  deleteAbout,
  getAboutData,
  getAllAbouts
} from "../controllers/aboutController.js";

const router = express.Router();

// Member adds new About
router.post("/", createAbout);

// Member fetches **only their own About**
router.get("/:memberCode/:memberName/:communityName", getAboutData);

// Admin fetches all Abouts (optional)
router.get("/", getAllAbouts);

// Update & delete by ID
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

export default router;


