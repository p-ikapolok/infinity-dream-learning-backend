import express from "express";
import cors from "cors";

const app = express();

// Allow only your frontend domain(s)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json());

// Example root route
app.get("/", (req, res) => {
  res.send("Your backend is live!");
});

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

export default app;
