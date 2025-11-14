import Contact from '../models/contact.js';
import fs from 'fs';
import path from 'path';



// Save contact
export const saveContactInfo = async (req, res) => {
  try {
    const { phone, email, address, memberCode, memberName, communityName, communityId } = req.body;

    if (!phone || !email || !address) {
      return res.status(400).json({ error: "All fields except image are required." });
    }

    const image = req.file ? `/uploads/contact/${req.file.filename}` : null;

    const newContact = new Contact({
      phone,
      email,
      address,
      image,
      memberCode,
      memberName,
      communityName,
      communityId
    });

    await newContact.save();

    res.status(200).json({ message: "Contact info saved successfully.", newContact });
  } catch (error) {
    console.error("Error saving contact info:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Get all contacts (or filter by member if needed)
export const getContactInfo = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.query;

    const filter = {};
    if (memberCode) filter.memberCode = memberCode;
    if (memberName) filter.memberName = memberName;
    if (communityName) filter.communityName = communityName;

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Update contact
export const updateContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, email, address } = req.body;

    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Delete old image if new one uploaded
    if (req.file && existingContact.image) {
      const oldImagePath = path.join(process.cwd(), existingContact.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log("Failed to delete old image:", err);
      });
    }

    const imagePath = req.file ? `/uploads/contact/${req.file.filename}` : existingContact.image;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { phone, email, address, image: imagePath },
      { new: true }
    );

    res.status(200).json({ message: 'Contact updated successfully', updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete contact
export const deleteContactInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (contact.image) {
      const imagePath = path.join(process.cwd(), contact.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Error deleting image:", err);
      });
    }

    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
