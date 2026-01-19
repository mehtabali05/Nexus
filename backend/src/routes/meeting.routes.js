import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createMeeting,
  getMyMeetings,
  updateMeetingStatus
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.post("/", protect, createMeeting);
router.get("/me", protect, getMyMeetings);
router.put("/:id/status", protect, updateMeetingStatus);

export default router;
