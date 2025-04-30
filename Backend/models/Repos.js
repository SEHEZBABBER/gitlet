import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
    owner: String,
    name: String,
    description:String,
    commitFile: {
      filename: String,
      contentType: { type: String, default: "application/octet-stream" },
      data: Buffer
    }
  });
  
  export const Repo = mongoose.model("Repo", RepoSchema);
  