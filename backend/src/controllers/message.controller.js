import Message from "../models/Message.model.js";

// GET chat history between two users
export const getChatHistory = async (req, res, next) => {
  try {
    const { partnerId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: partnerId },
        { senderId: partnerId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 }); // Oldest first for chat flow

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// POST send a message (This will be called before/during Socket emission)
export const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    const newMessage = await Message.create({
      senderId,
      receiverId,
      content
    });

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};