import express from 'express';
import {
  saveContactInfo,
  getContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from '../controllers/contactController.js';
import upload from '../middleware/uploads.js';
import Contact from '../models/contact.js';

const router = express.Router();

// POST - Save Contact
router.post("/", upload.single("image"), saveContactInfo);

// GET - Filter contacts
// /api/contact?memberCode=M1&communityName=Porwal
router.get("/", getContactInfo);

// GET - Get contact by memberCode
// /api/contact/M1
router.get("/:memberCode", async (req, res) => {
  try {
    const { memberCode } = req.params;
    const contact = await Contact.findOne({ memberCode });

    if (!contact) {
      return res.status(404).json({ message: "No contact found for this memberCode" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), updateContactInfo);

// DELETE
router.delete("/:id", deleteContactInfo);

export default router;
