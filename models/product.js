import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  englishName: { type: String, required: true },
  size: { type: String, required: true },
  mrp: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  
  // Member info
  memberCode: { type: String },
  memberName: { type: String },
  communityName: { type: String },
  communityId: { type: String },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
