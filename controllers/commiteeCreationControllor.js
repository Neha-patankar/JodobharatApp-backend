// controllers/commiteeCreationControllor.js
// import CommiteeMember from '../models/commiteeCreation.js'; // Add .js extension

// export const addMember = async (req, res) => {
//   try {
//     const { name, title, description } = req.body;
//     const image = req.file?.filename;

//     if (!image) {
//       return res.status(400).json({ message: 'Image is required' });
//     }

//     const newMember = new CommiteeMember({
//       name,
//       title,
//       description,
//       image
//     });

//     await newMember.save();
//     res.status(201).json({ message: 'Committee member added successfully', member: newMember });
//   } catch (error) {
//     console.error('Error adding member:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


import CommiteeMember from "../models/commiteeCreation.js";

export const addMember = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      memberCode,
      adminName,
      communityId,
      communityName,
    } = req.body;

    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newMember = new CommiteeMember({
      name,
      title,
      description,
      image,
      memberCode,
      adminName,
      communityId,
      communityName,
    });

    await newMember.save();
    res.status(201).json({
      message: "Committee member added successfully",
      member: newMember,
    });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMembers = async (req, res) => {
  try {
    const members = await CommiteeMember.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description } = req.body;
    const updateData = { name, title, description };
    
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedMember = await CommiteeMember.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await CommiteeMember.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};