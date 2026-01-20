import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getChatHistory, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:partnerId", protect, getChatHistory);
router.post("/", protect, sendMessage);

export default router;