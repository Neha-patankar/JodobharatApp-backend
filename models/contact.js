import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String }, // Optional image URL or path
    memberCode: { type: String },
  memberName: { type: String },
  communityName: { type: String },
  communityId: { type: String },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
