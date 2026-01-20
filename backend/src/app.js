import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { errorHandler } from './middleware/error.middleware.js';
import path from "path";

const app = express();

// app.use(cors());
const allowedOrigins = [
  'http://localhost:5173',
  'https://nexus-iota-five.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use(
//     cors({
//       origin: 'http://localhost:5173',
//       credentials: true,
//     })
// );
app.use(express.json());
app.use(morgan("dev")); 
// Serve uploaded files
app.use("/uploads", express.static(path.join("uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

export default app;
