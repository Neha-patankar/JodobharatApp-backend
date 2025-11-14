



import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    communityId: { type: String, unique: true, sparse: true },
    communityName: String,
    address: String,
    city: String,
    state: String,
    country: String,
    logoPath: String,
    startDate: Date,
    endDate: Date,
    remark: String,
    reactDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["notactive", "active", "blocked"],
      default: "notactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", communitySchema);
