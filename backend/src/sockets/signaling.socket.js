import { Server } from "socket.io";
import Meeting from "../models/Meeting.model.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("send-private-message", (data) => {
      // data should contain { receiverId, content, senderId, ... }
      // Emit to a room named after the receiver's User ID
      socket.to(data.receiverId).emit("receive-private-message", data);
    });

    // Let users join a personal room based on their ID upon login
    socket.on("join-personal-room", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    // Join meeting room
    socket.on("join-room", async ({ meetingId, userId }) => {
      try {
        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
          return socket.emit("error", "Meeting not found");
        }

        const isParticipant =
          meeting.createdBy.toString() === userId ||
          meeting.withUser.toString() === userId;

        if (!isParticipant || meeting.status !== "Accepted") {
          return socket.emit("error", "Not authorized to join this meeting");
        }

        socket.join(meetingId);
        socket.emit("joined-room", meetingId);
      } catch (error) {
        socket.emit("error", "Something went wrong");
      }
    });

    // WebRTC signaling
    socket.on("signal", ({ meetingId, signal }) => {
      socket.to(meetingId).emit("signal", signal);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
