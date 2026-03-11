import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import http from "http";

import { connectDB } from "./config/db";
import scheduler from "./scheduler/scheduler";
import { startWorker } from "./scheduler/worker";
import attachSocket from "./sockets/socketServer";

// Routes
import authRoutes from "./routes/auth";
import courseRoutes from "./routes/courses";
import lessonRoutes from "./routes/lessons";
import groupRoutes from "./routes/groups";
import teamRoutes from "./routes/teams";
import uploadRoutes from "./routes/uploads";
import aiRoutes from "./routes/ai";
import calendarRoutes from "./routes/calendar";

const app: Application = express();

app.use(cors());
app.use(express.json());

/*
API ROUTES
*/
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calendar", calendarRoutes);

/*
PORT
*/
const PORT: number = Number(process.env.PORT) || 4000;

/*
CREATE HTTP SERVER
*/
const server = http.createServer(app);

/*
SOCKET.IO
*/
attachSocket(server, app);

/*
START SERVER
*/
const startServer = async () => {
  try {
    // connect PostgreSQL
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      // start scheduler
      scheduler.start();

      // start worker if redis exists
      if (process.env.REDIS_URL) {
        startWorker();
      }
    });

  } catch (err) {
    console.error("Server start error:", err);
    process.exit(1);
  }
};

startServer();
