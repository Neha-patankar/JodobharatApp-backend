import mongoose from "mongoose";

const certificatesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // image filename
  memberCode: { type: String },
  memberName: { type: String },
  communityName: { type: String },
  communityId: { type: String },
}, { timestamps: true });

export default mongoose.model("Certificates", certificatesSchema);
