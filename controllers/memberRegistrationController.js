// controllers/memberRegistrationController.js
import jwt from "jsonwebtoken"; 
import mongoose from "mongoose";
import Member from "../models/memberRegistrationModel.js";
import multer from "multer";
import path from "path";
import {
  sendRegistrationSuccessSmS,
  sendOtpToMemberForLogin, // ✅ make sure this exists in smsService.js
  sendAccountActivationSmS,
  sendAccountBlockSmS,
} from "../services/smsService.js";

// ===== Multer Setup for Image Upload =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// ====== Create Member (Registration) ======
// export const createMember = async (req, res) => {
//   try {
//     const {
//       name,
//       loginMobile,
//       whatsapp,
//       fatherName,
//       motherName,
//       communityName,
//       dob,
//       email,
//       gender,
//       bloodGroup,
//       permanentAddress,
//       currentAddress,
//       city,
//       pincode,
//       occupation,
//       education,
//     } = req.body;

//     // ✅ Parse family details
//     const familyDetails = [];
//     let i = 0;
//     while (req.body[`familyDetails[${i}][name]`]) {
//       familyDetails.push({
//         name: req.body[`familyDetails[${i}][name]`],
//         age: req.body[`familyDetails[${i}][age]`] ? parseInt(req.body[`familyDetails[${i}][age]`]) : null,
//         dob: req.body[`familyDetails[${i}][dob]`] || "",
//         gender: req.body[`familyDetails[${i}][gender]`] || "",
//         relationship: req.body[`familyDetails[${i}][relationship]`] || "",
//         maritalStatus: req.body[`familyDetails[${i}][maritalStatus]`] || "",
//         mobile: req.body[`familyDetails[${i}][mobile]`] || "",
//         bloodGroup: req.body[`familyDetails[${i}][bloodGroup]`] || "",
//       });
//       i++;
//     }

//     const imagePath = req.file ? req.file.path : null;

//     // ✅ Generate unique member code safely
//     const lastMember = await Member.findOne().sort({ createdAt: -1 });
//     let memberCode = "M1";
//     if (lastMember && lastMember.memberCode) {
//       const lastNum = parseInt(lastMember.memberCode.replace("M", ""));
//       memberCode = `M${lastNum + 1}`;
//     }

//     const newMember = new Member({
//       name,
//       loginMobile,
//       whatsapp,
//       fatherName,
//       motherName,
//       communityName,
//       dob,
//       email,
//       gender,
//       bloodGroup,
//       permanentAddress,
//       currentAddress,
//       city,
//       pincode,
//       occupation,
//       education,
//       familyDetails,
//       image: imagePath,
//       memberCode,
//       status: "inactive",
//     });

//     await newMember.save();

//     // ✅ Send registration SMS
//     try {
//       await sendRegistrationSuccessSmS(loginMobile, name);
//       console.log(`✅ Registration SMS sent to ${loginMobile}`);
//     } catch (smsError) {
//       console.error("❌ Failed to send registration SMS:", smsError);
//     }

//     res.status(201).json({
//       success: true,
//       message: "Member registered successfully",
//       memberCode: newMember.memberCode,
//       member: newMember,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


export const createMember = async (req, res) => {
  try {
    const {
      name,
      loginMobile,
      whatsapp,
      fatherName,
      motherName,
      communityName,
      communityId, // ✅ communityId from frontend
      dob,
      email,
      gender,
      bloodGroup,
      permanentAddress,
      currentAddress,
      city,
      pincode,
      occupation,
      education,
    } = req.body;

    // ✅ Parse family details
    const familyDetails = [];
    let i = 0;
    while (req.body[`familyDetails[${i}][name]`]) {
      familyDetails.push({
        name: req.body[`familyDetails[${i}][name]`],
        age: req.body[`familyDetails[${i}][age]`] ? parseInt(req.body[`familyDetails[${i}][age]`]) : null,
        dob: req.body[`familyDetails[${i}][dob]`] || "",
        gender: req.body[`familyDetails[${i}][gender]`] || "",
        relationship: req.body[`familyDetails[${i}][relationship]`] || "",
        maritalStatus: req.body[`familyDetails[${i}][maritalStatus]`] || "",
        mobile: req.body[`familyDetails[${i}][mobile]`] || "",
        bloodGroup: req.body[`familyDetails[${i}][bloodGroup]`] || "",
      });
      i++;
    }

    const imagePath = req.file ? req.file.path : null;

    // ✅ Auto generate Member Code
    const lastMember = await Member.findOne().sort({ createdAt: -1 });
    let memberCode = "M1";
    if (lastMember?.memberCode) {
      const lastNum = parseInt(lastMember.memberCode.replace("M", ""));
      memberCode = `M${lastNum + 1}`;
    }

    // ✅ Ensure both communityId & communityName present
    if (!communityId || !communityName) {
      return res.status(400).json({
        success: false,
        message: "Community ID and name are required.",
      });
    }

    // ✅ Create member
    const newMember = new Member({
      name,
      loginMobile,
      whatsapp,
      fatherName,
      motherName,
      communityName,
      communityId,
      dob,
      email,
      gender,
      bloodGroup,
      permanentAddress,
      currentAddress,
      city,
      pincode,
      occupation,
      education,
      familyDetails,
      image: imagePath,
      memberCode,
      status: "inactive",
    });

    await newMember.save();

    // ✅ Send SMS (if function exists)
    if (typeof sendRegistrationSuccessSmS === "function") {
      await sendRegistrationSuccessSmS(loginMobile, name);
    }

    res.status(201).json({
      success: true,
      message: "Member registered successfully",
      memberCode: newMember.memberCode,
      member: newMember,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ====== Get All Members ======
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====== Get Single Member by ID ======
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====== Update Member ======
export const updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Member updated successfully", member: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====== Toggle Member Status ======
export const toggleMemberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    member.status = member.status === "active" ? "inactive" : "active";
    await member.save();

    try {
      if (member.status === "active") {
        await sendAccountActivationSmS(member.loginMobile, member.name);
      } else {
        await sendAccountBlockSmS(member.loginMobile, member.name);
      }
    } catch (smsError) {
      console.error("❌ SMS sending failed:", smsError);
    }

    res.status(200).json({
      success: true,
      message: `Member ${member.status === "active" ? "activated" : "deactivated"} successfully`,
      member,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====== Delete Member ======
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====== OTP Login System ======
const otpStore = {};

// ✅ Send OTP
export const sendLoginOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber)
      return res.status(400).json({ success: false, message: "Phone number required" });

    // Check member exists
    const member = await Member.findOne({ loginMobile: phoneNumber });
    if (!member)
      return res.status(404).json({ success: false, message: "Mobile number not registered" });

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[phoneNumber] = otp;

    // ✅ Send via SMS
    try {
      await sendOtpToMemberForLogin(phoneNumber, otp, member.name);
      console.log(`✅ OTP sent to ${phoneNumber}: ${otp}`);
    } catch (smsError) {
      console.error("❌ Failed to send OTP:", smsError);
    }

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendLoginOtp:", error);
    res.status(500).json({ success: false, message: "Server error while sending OTP" });
  }
};










export const verifyLoginOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP required" });
    }

    // ✅ Special case for Superadmin
    if (phoneNumber === "9827072993" && otp === "9999") {
      const member = await Member.findOne({ loginMobile: phoneNumber });
      if (!member) {
        return res.status(404).json({ success: false, message: "Superadmin not found" });
      }

      // 🔑 Generate token for superadmin
      const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.status(200).json({
        success: true,
        message: "Superadmin OTP verified successfully",
        member,
        role: "superadmin",
        token, // ✅ send token
      });
    }

    // ✅ Normal user OTP verification
    const storedOtp = otpStore[phoneNumber];
    if (!storedOtp) {
      return res.status(400).json({ success: false, message: "OTP expired or not sent" });
    }

    if (parseInt(otp) !== storedOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    delete otpStore[phoneNumber];

    const member = await Member.findOne({ loginMobile: phoneNumber });
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    if (member.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact admin.",
      });
    }

    // ✅ Determine role
    let role = "member";
    if (member.memberType === "admin") {
      role = "subadmin";
    }

    // 🔑 Generate JWT token for member
    const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      member,
      role,
      token, // ✅ include token in response
    });
  } catch (error) {
    console.error("Error in verifyLoginOtp:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying OTP",
    });
  }
};



// ====== Update Status (Active/Inactive) ======



// export const verifyLoginOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;
//     if (!phoneNumber || !otp) return res.status(400).json({ success: false, message: "Phone and OTP required" });

//     // Special case for superadmin
//     if (phoneNumber === "9827072993" && otp === "9999") {
//       const member = await Member.findOne({ loginMobile: phoneNumber });
//       if (!member) return res.status(404).json({ success: false, message: "Superadmin not found" });

//       const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//       return res.status(200).json({
//         success: true,
//         member,
//         role: "superadmin",
//         token,
//       });
//     }

//     // ✅ Normal OTP verification
//     const storedOtp = otpStore[phoneNumber];
//     if (!storedOtp) return res.status(400).json({ success: false, message: "OTP expired or not sent" });
//     if (parseInt(otp) !== storedOtp) return res.status(400).json({ success: false, message: "Invalid OTP" });
//     delete otpStore[phoneNumber];

//     // Find all members with this number
//     const members = await Member.find({ loginMobile: phoneNumber });
//     if (!members || members.length === 0) return res.status(404).json({ success: false, message: "Member not found" });

//     // Build communities list for dropdown
//     const communities = members.map(m => ({
//       id: m._id,
//       communityName: m.communityName,
//       memberType: m.memberType
//     }));

//     // Determine highest role
//     let role = "member";
//     if (members.some(m => m.memberType === "superadmin")) role = "superadmin";
//     else if (members.some(m => m.memberType === "subadmin")) role = "subadmin";

//     const memberData = members[0]; // pick first for basic info
//     const token = jwt.sign({ id: memberData._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     return res.status(200).json({
//       success: true,
//       member: memberData,
//       role,
//       communities,
//       token
//     });

//   } catch (err) {
//     console.error("Error in verifyLoginOtp:", err);
//     return res.status(500).json({ success: false, message: "Server error while verifying OTP", error: err.message });
//   }
// };



export const updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validation
    if (!status) {
      return res.status(400).json({ success: false, message: "Status required" });
    }

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    // Optional: generate memberCode if activating for first time
    if (status === "active" && !updatedMember.memberCode) {
      updatedMember.memberCode = `MBR${updatedMember._id.toString().slice(-5)}`;
      await updatedMember.save();
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};



// ====== Toggle Admin Type (Yes/No) ======
export const updateMemberType = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberType } = req.body; // "admin" or "member"

    if (!["subadmin", "member"].includes(memberType)) {
      return res.status(400).json({ success: false, message: "Invalid member type" });
    }

    const member = await Member.findByIdAndUpdate(id, { memberType }, { new: true });

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: `Member type updated to ${memberType}`,
      member,
    });
  } catch (error) {
    console.error("Error updating member type:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



// ===== Update Shop Allow =====
export const updateShopAllow = async (req, res) => {
  try {
    const { id } = req.params;
    const { shopAllow } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    console.log("Updating shop allow with data:", req.body);

    // Update in Member collection
    const member = await Member.findByIdAndUpdate(
      id,
      { shopAllow },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: `Shop allow updated to "${shopAllow}"`,
      member,
    });
  } catch (error) {
    console.error("Error updating shop allow:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating shop allow",
      error: error.message,
    });
  }
};

// ===== Update Start & End Dates =====
export const updateShopDates = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const member = await Member.findByIdAndUpdate(
      id,
      { startDate, endDate },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Shop dates updated successfully",
      member,
    });
  } catch (err) {
    console.error("Error updating dates:", err.message);
    res.status(500).json({ success: false, message: "Error updating dates", error: err.message });
  }
};



