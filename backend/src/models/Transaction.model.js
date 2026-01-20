import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    stripePaymentIntentId: String,

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "usd"
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
