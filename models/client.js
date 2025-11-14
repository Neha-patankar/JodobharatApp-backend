import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true }, // image filename
  memberCode: { type: String }, // from logged-in user
  memberName: { type: String },
  communityName: { type: String },
  communityId: { type: String },
}, { timestamps: true });

export default mongoose.model("Clients", clientSchema);
