import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Investor", "Entrepreneur"],
    required: true
  },
  name: String,
  email: { type: String, unique: true },
  password: String,

  profile: {
    bio: String,
    history: String,
    preferences: String
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
