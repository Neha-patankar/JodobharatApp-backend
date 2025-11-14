// // models/commiteeCreation.js (or committeeCreation.js)
// import mongoose from 'mongoose';

// const commiteeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   image: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('CommiteeMember', commiteeSchema);


import mongoose from "mongoose";

const commiteeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },

    // 🆕 Add these fields
    memberCode: { type: String }, // from logged-in member
     adminName: { type: String },
    communityId: { type: String },
    communityName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("CommiteeMember", commiteeSchema);
