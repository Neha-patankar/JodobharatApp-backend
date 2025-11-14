

import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  memberCode: { type: String, unique: true },
  website: { type: String },
  name: { type: String, required: true },
  loginMobile: { type: String, required: true },
  whatsapp: String,
  fatherName: String,
  motherName: String,

  // 🔹 Add community reference
  // communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  communityName: String,
  communities: [
  {
    id: String,
    name: String
  }
]
,
  communityId: String,

  dob: String,
  email: String,
  gender: String,
  bloodGroup: String,
  permanentAddress: String,
  currentAddress: String,
  city: String,
  pincode: String,
  occupation: String,
  education: String,
  image: String,

  familyDetails: [
    {
      name: String,
      age: Number,
      dob: String,
      gender: String,
      relationship: String,
      maritalStatus: String,
      mobile: String,
      bloodGroup: String,
    },
  ],

  shopAllow: { type: String, enum: ["yes", "no"], default: "no" },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["inactive", "active"], default: "inactive" },
  memberType: { type: String, enum: ["member", "subadmin"], default: "member" },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Auto-generate memberCode
memberSchema.pre("save", async function (next) {
  if (!this.memberCode) {
    const lastMember = await mongoose.model("MemberRegistration").findOne({}, {}, { sort: { createdAt: -1 } });
    let nextNumber = 1;
    if (lastMember && lastMember.memberCode) {
      const lastNumber = parseInt(lastMember.memberCode.replace("M", ""));
      nextNumber = lastNumber + 1;
    }
    this.memberCode = `M${nextNumber}`;
  }
  next();
});

export default mongoose.model("MemberRegistration", memberSchema);
