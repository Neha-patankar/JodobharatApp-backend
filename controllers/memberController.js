


// controllers/memberController.js
import Member from "../models/member.js";
import Community from "../models/community.js";

export const registerMember = async (req, res) => {
  const { name, email, password, communityId, communityName, address, mobile  } = req.body;

  try {
    // Check if email exists
    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Fetch community details
    const community = await Community.findOne({ communityId });
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    // Create new member with community info
    const newMember = new Member({
      name,
      email,
      password,
      address,
      mobile,
      communityId: community.communityId,
      communityName: community.communityName
    });

    await newMember.save();
    res.status(201).json({ message: "Member registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch members", error });
  }
};

export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
};



export const updateMember = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member updated successfully", updatedMember });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};


export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};



// Backend: controllers/memberController.js

// controller/memberController.js
export const loginMember = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const member = await Member.findOne({ mobile });

    if (!member || member.password !== password) {
      return res.status(401).json({ message: "Invalid mobile or password" });
    }

    res.status(200).json({
      message: "Login successful",
      member: {
        name: member.name,
        mobile: member.mobile,
        communityId: member.communityId,
        communityName: member.communityNamed
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};