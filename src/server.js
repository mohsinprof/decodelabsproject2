import express from "express";
import cors from "cors";
import mongoose from "mongoose";          // ✅ add this
import tasksRouter from "./routes/task.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection string goes here
const MONGODB_URI = "i";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "decodelabs-project-2-api" });
});

app.use("/tasks", tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));