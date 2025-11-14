import ManagementTeam from "../models/ManagementTeam.js";

// ✅ Add Member
export const addMember = async (req, res) => {
  try {
    const { name, title, description, memberCode, memberName, communityId, communityName } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ error: "Image is required" });
    if (!memberName || !communityName) return res.status(400).json({ error: "Member info missing" });

    const newMember = new ManagementTeam({
      name, title, description, image,
      memberCode, memberName, communityId, communityName
    });

    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Members by logged-in user
export const getMembersByUser = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.params;
    const members = await ManagementTeam.find({ memberCode, memberName, communityName });
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Member
export const updateMember = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file?.filename;

    const updatedData = { name, title, description };
    if (image) updatedData.image = image;

    const updatedMember = await ManagementTeam.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ success: true, data: updatedMember });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete Member
export const deleteMember = async (req, res) => {
  try {
    await ManagementTeam.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
