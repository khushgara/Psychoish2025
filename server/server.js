// ⚠️  MUST be first import — loads .env and validates required variables
import "./config/dotenv.js";

import express from "express";
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

// ── Startup ────────────────────────────────────────────────────────────────────
// IMPORTANT: await DB connection BEFORE accepting any requests.
// Without this, requests arrive before Mongoose is ready → 500 errors on all routes.
const startServer = async () => {
  await connectDB(); // wait for MongoDB to be fully connected

  const app = express();

  // CORS — allow local dev and the production frontend
  const ALLOWED_ORIGINS = [
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/,
    "https://peachpuff-trout-823444.hostingersite.com",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
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

  // Health check — visit /health to instantly see server + DB status
  app.get("/health", (req, res) => {
    const dbState = mongoose.connection.readyState;
    res.json({
      status: "ok",
      db: dbState === 1 ? "connected ✅" : `not connected ❌ (state=${dbState})`,
      env: process.env.NODE_ENV || "development",
    });
  });

  // Root info route
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

  // DB test route
  app.get("/db-test", (req, res) => {
    const state = mongoose.connection.readyState;
    res.json({ success: state === 1, mongoState: state });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("❌ Server error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

startServer();
