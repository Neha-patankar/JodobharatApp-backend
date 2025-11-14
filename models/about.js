// // // models/About.js
// // import mongoose from 'mongoose';

// // const aboutSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   mission: String,
// //   vision: String,
// //   values: String
// // });

// // const About = mongoose.model('About', aboutSchema);
// // export default About;


// import mongoose from 'mongoose';

// const aboutSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   mission: { type: String, required: true },
//   vision: { type: String, required: true },
//   values: { type: String, required: true },
//   memberCode: { type: String, required: true }, // ✅ added
//   memberName: { type: String, required: true }  // ✅ added
// });


// const About = mongoose.model('About', aboutSchema);
// export default About;


import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    mission: { type: String, required: true, trim: true },
    vision: { type: String, required: true, trim: true },
    values: { type: String, required: true, trim: true },

    // linked member info
    memberCode: { type: String },
    memberName: { type: String },
    communityId: { type: String },
    communityName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);



