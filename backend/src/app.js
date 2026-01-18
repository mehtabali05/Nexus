import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

export default app;
