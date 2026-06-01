import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS — allow local dev and the production frontend (no config changes needed)
const ALLOWED_ORIGINS = [
  /^http:\/\/localhost(:\d+)?$/,           // any localhost port
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,        // 127.0.0.1 variants
  "https://peachpuff-trout-823444.hostingersite.com", // Hostinger live site
  // Pull from env so any host can inject the real frontend URL:
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    const allowed = ALLOWED_ORIGINS.some((o) =>
      typeof o === "string" ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin not allowed — ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/chat", chatRoutes);

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
      newsletter: "/api/newsletter",
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

app.get("/db-test", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    // 1 = connected
    res.json({ success: state === 1, mongoState: state });
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
