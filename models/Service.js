import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Service name
  description: { type: String, required: true }, // Service details
  image: { type: String, required: true },       // Image filename
  memberCode: { type: String, required: true },  // Logged-in member
  memberName: { type: String, required: true },
  communityName: { type: String, required: true },
  communityId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
