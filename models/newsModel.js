// // models/newsModel.js
// import mongoose from "mongoose";

// const newsSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: String,
//   imageName: String,
//   videoUrl: String,
//   category: {
//     type: String,
//     enum: [
//       "उपलब्धिया",
//       "कार्यक्रम",
//       "सुझाव",
//       "निमंत्रण",
//       "नौकरी",
//       "गतिविधियां",
//       "समाज सेवा",
//     ],
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const News = mongoose.model("News", newsSchema);
// export default News;

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    imageName: String,
    videoUrl: String,
    category: { type: String, required: true },

    // 🔹 New fields
    communityName: { type: String }, // from logged-in user
    adminName: { type: String }, // logged-in admin
    memberCode: { type: String },
    communityId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
