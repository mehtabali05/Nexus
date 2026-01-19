import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false // IMPORTANT: password never returned by default
    },

    role: {
      type: String,
      enum: ["Investor", "Entrepreneur"],
      required: true
    },

    profile: {
      bio: String,
      history: String,
      preferences: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
