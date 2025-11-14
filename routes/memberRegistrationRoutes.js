


import express from "express";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  upload,
  sendLoginOtp,
  verifyLoginOtp,
  toggleMemberStatus,
  updateMemberStatus,
  updateMemberType,
  updateShopAllow,
  updateShopDates,
} from "../controllers/memberRegistrationController.js";
import Member from "../models/memberRegistrationModel.js";

const router = express.Router();

// Create member with image upload
router.post("/", upload.single("image"), createMember);

// CRUD routes
router.get("/", getAllMembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);
// Update status
router.put("/toggle/:id", toggleMemberStatus); // existing
router.put("/status/:id", updateMemberStatus); // new
router.put("/type/:id", updateMemberType); 
// ✅ Shop Allow Update
router.put("/shopallow/:id", updateShopAllow);

// ✅ Shop Dates Update
router.put("/shopdates/:id", updateShopDates);
// ✅ These must match frontend exactly
router.post("/send-login-otp", sendLoginOtp);
router.post("/verify-login-otp", verifyLoginOtp);

// ✅ Check member status before sending OTP
router.post("/check-status", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const member = await Member.findOne({ loginMobile: phoneNumber });

    if (!member) {
      return res.json({ success: false, message: "Member not found!" });
    }

    res.json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while checking status" });
  }
});
// router.post("/checkMobile", async (req, res) => {
//   const { mobile } = req.body;
//   const existingMember = await Member.findOne({ loginMobile: mobile });
//   res.json({ exists: !!existingMember });
// });

router.post("/checkMobile", async (req, res) => {
  try {
    const { loginMobile, communityName } = req.body;

    if (!loginMobile || !communityName) {
      return res.status(400).json({ success: false, message: "Mobile and communityName are required" });
    }

    // ✅ Find if this mobile already exists in the same community
    const existingMember = await Member.findOne({
      loginMobile: loginMobile,
      communityName: communityName,
    });

    if (existingMember) {
      return res.json({ exists: true, message: "This mobile is already registered in this community" });
    } else {
      return res.json({ exists: false, message: "Mobile can be used in this community" });
    }
  } catch (err) {
    console.error("Error checking mobile:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
