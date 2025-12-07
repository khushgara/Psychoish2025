import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import "./config/db.js"; // Initialize database connection

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/consultations", consultationRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Psychoish API Server",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      assessments: "/api/assessments",
      results: "/api/results",
      profile: "/api/profile",
      consultations: "/api/consultations",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

