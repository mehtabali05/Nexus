import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/sockets/signaling.socket.js";
import connectDB from "./src/config/db.js";

connectDB();

const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
