import Meeting from "../models/Meeting.model.js";

// CREATE meeting with conflict detection
export const createMeeting = async (req, res, next) => {
  try {
    const { withUser, startTime, endTime } = req.body;

    // Check conflict for creator
    const conflict = await Meeting.findOne({
      status: "Accepted",
      $or: [
        { createdBy: req.user._id },
        { withUser: req.user._id }
      ],
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    if (conflict) {
      return res.status(400).json({
        message: "You already have an accepted meeting at this time"
      });
    }

    const meeting = await Meeting.create({
      createdBy: req.user._id,
      withUser,
      startTime,
      endTime
    });

    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
};


// GET meetings for logged-in user
export const getMyMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { createdBy: req.user._id },
        { withUser: req.user._id }
      ]
    })
      .populate("createdBy", "name email role")
      .populate("withUser", "name email role");

    res.json(meetings);
  } catch (error) {
    next(error);
  }
};

// ACCEPT or REJECT meeting
export const updateMeetingStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      const meeting = await Meeting.findById(req.params.id);
  
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      // Only receiver can accept/reject
      if (meeting.withUser.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      // Prevent re-updating
      if (meeting.status !== "Pending") {
        return res.status(400).json({ message: "Meeting already processed" });
      }
  
      meeting.status = status;
      await meeting.save();
  
      res.json({
        message: `Meeting ${status.toLowerCase()}`,
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  
