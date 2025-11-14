// controllers/communityController.js

import { v4 as uuidv4 } from "uuid";
import Community from "../models/community.js"

export const createCommunity = async (req, res) => {
  try {
    const {
      communityName,
      address,
      city,
      state,
      country,
      startDate,
      endDate,
      remark,
    } = req.body;

    // ✅ Store relative path (so frontend can access)
    const logoPath = req.file ? `uploads/${req.file.filename}` : null;

    const communityId = "COM-" + uuidv4().slice(0, 8).toUpperCase();

    const newCommunity = new Community({
      communityId,
      communityName,
      address,
      city,
      state,
      country,
      startDate,
      endDate,
      remark,
      logoPath,
    });

    await newCommunity.save();

    res.status(201).json({
      message: "Community created successfully",
      community: newCommunity,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating community", error });
  }
};

// GET /api/community
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching communities", error });
  }
};


// PUT /api/community/:id
export const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      communityName: req.body.communityName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      remark: req.body.remark,
      status: req.body.status,
    };

    // If logo file is uploaded
    if (req.file) {
      updatedData.logoPath = req.file.path;
    }

    const updatedCommunity = await Community.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json({ message: "Community updated", updatedCommunity });
  } catch (error) {
    res.status(500).json({ message: "Error updating community", error });
  }
};

// DELETE /api/community/:id
export const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Community.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting community", error });
  }
};


export const activateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (community.status === "active") {
      return res.status(400).json({ message: "Community already active" });
    }

    // ✅ Generate city prefix
    const cityPrefix = (community.city || "GEN").substring(0, 3).toUpperCase();

    // ✅ Find last activated community with same prefix
    const lastCommunity = await Community.findOne({
      communityId: new RegExp(`^${cityPrefix}`, "i"),
    }).sort({ createdAt: -1 });

    let newNumber = 1;
    if (lastCommunity && lastCommunity.communityId) {
      const lastCode = parseInt(lastCommunity.communityId.slice(-3)); // last 3 digits
      newNumber = lastCode + 1;
    }

    const newCommunityId = `${cityPrefix}${String(newNumber).padStart(3, "0")}`;

    // ✅ Update the community record
    community.communityId = newCommunityId;
    community.status = "active";

    await community.save();

    res.status(200).json({
      message: "Community activated successfully",
      communityId: newCommunityId,
    });
  } catch (error) {
    console.error("Error activating community:", error);
    res.status(500).json({ message: "Error activating community", error });
  }
};

