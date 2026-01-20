import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fileName: String,
    filePath: String,

    isSigned: {
      type: Boolean,
      default: false
    },

    signatureImage: {
      type: String // path or base64 (mock)
    }
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
