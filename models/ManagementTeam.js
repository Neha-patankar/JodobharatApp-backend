import mongoose from "mongoose";

const managementTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  memberCode: { type: String, required: true },
  memberName: { type: String, required: true },
  communityName: { type: String, required: true },
  communityId: { type: String }
}, { timestamps: true });

export default mongoose.model("ManagementTeam", managementTeamSchema);
