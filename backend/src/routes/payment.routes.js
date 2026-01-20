import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createPaymentIntent,
  confirmPayment
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent", protect, createPaymentIntent);
router.put("/:id/confirm", protect, confirmPayment);

export default router;
