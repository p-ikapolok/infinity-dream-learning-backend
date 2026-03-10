import dotenv from "dotenv";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Pool } from "pg";

import authRoutes from "./routes/auth";
import courseRoutes from "./routes/courses";
import classroomRoutes from "./routes/classroom";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classroom", classroomRoutes);

const PORT: number = Number(process.env.PORT) || 4000;

const server = http.createServer(app);


// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test DB connection
const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};


// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// Classroom namespace
io.of("/classroom").on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", ({ classroomId, user }) => {
    socket.join(classroomId);

    io.of("/classroom")
      .to(classroomId)
      .emit("participant-joined", { user, id: socket.id });
  });

  socket.on("leave", ({ classroomId, user }) => {
    socket.leave(classroomId);

    io.of("/classroom")
      .to(classroomId)
      .emit("participant-left", { user, id: socket.id });
  });

  socket.on("message", ({ classroomId, message }) => {
    io.of("/classroom").to(classroomId).emit("message", message);
  });

  socket.on("screen-share", (data) => {
    io.of("/classroom").to(data.classroomId).emit("screen-share", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


// Start server
const startServer = async () => {
  await connectDatabase();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

export { pool };
