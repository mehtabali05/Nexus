import stripe from "../config/stripe.js";
import Transaction from "../models/Transaction.model.js";
import Meeting from "../models/Meeting.model.js";

// Create payment intent
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { meetingId, amount } = req.body;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting || meeting.status !== "Accepted") {
      return res.status(400).json({ message: "Invalid meeting" });
    }

    // Only parent can pay
    if (meeting.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to pay" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: "usd"
    });

    const transaction = await Transaction.create({
      meeting: meetingId,
      user: req.user._id,
      amount,
      stripePaymentIntentId: paymentIntent.id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id
    });
  } catch (error) {
    next(error);
  }
};

// Confirm payment (mock without webhook)
export const confirmPayment = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = "paid";
    await transaction.save();

    await Meeting.findByIdAndUpdate(transaction.meeting, {
      isPaid: true
    });

    res.json({ message: "Payment confirmed" });
  } catch (error) {
    next(error);
  }
};
