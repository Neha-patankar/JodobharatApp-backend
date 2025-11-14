
// import About from '../models/about.js';

// // Create
// export const createAbout = async (req, res) => {
//   const { title, description, mission, vision, values } = req.body;
//   try {
//     const newAbout = new About({ title, description, mission, vision, values });
//     await newAbout.save();
//     res.status(201).json(newAbout);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all
// export const getAbout = async (req, res) => {
//   try {
//     const about = await About.find(); // OR About.findOne() if only one
//     res.status(200).json(about);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching About Us', error });
//   }
// };

// // Update
// export const updateAbout = async (req, res) => {
//   try {
//     const updated = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete
// export const deleteAbout = async (req, res) => {
//   try {
//     await About.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };



import About from "../models/about.js";

// ✅ CREATE About
export const createAbout = async (req, res) => {
  try {
    const { title, description, mission, vision, values, memberCode, memberName, communityId, communityName } = req.body;

    if (!memberName || !communityName) {
      return res.status(400).json({ success: false, message: "Member info missing!" });
    }

    const newAbout = new About({
      title, description, mission, vision, values,
      memberCode, memberName, communityId, communityName
    });

    await newAbout.save();

    res.status(201).json({ success: true, message: "About added successfully", data: newAbout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ GET About for a specific member
export const getAboutData = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.params;

    const about = await About.findOne({ memberCode, memberName, communityName });

    if (!about) return res.status(200).json({ success: false, message: "No data found" });

    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET All Abouts (Admin)
export const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: abouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE About by ID
export const updateAbout = async (req, res) => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "About not found" });
    res.status(200).json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE About by ID
export const deleteAbout = async (req, res) => {
  try {
    const deleted = await About.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "About not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
