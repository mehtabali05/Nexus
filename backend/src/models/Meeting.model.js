const meetingSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    withUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending"
    }
  });
  