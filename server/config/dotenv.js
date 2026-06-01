/**
 * config/dotenv.js
 * Must be imported FIRST in server.js before any other module.
 * Loads .env file in development; in production (Hostinger/Render),
 * env vars are injected by the platform so dotenv is a no-op.
 */
import dotenv from "dotenv";

dotenv.config(); // safe to call even if .env doesn't exist (production)

// Validate required variables at startup so the server fails fast with a clear message
const REQUIRED_VARS = ["MONGO_URI", "JWT_SECRET"];

// In production, MONGODB_URI replaces MONGO_URI (Hostinger injects it)
const missingVars = REQUIRED_VARS.filter(
  (key) =>
    key === "MONGO_URI"
      ? !process.env.MONGODB_URI && !process.env.MONGO_URI
      : !process.env[key]
);

if (missingVars.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingVars.join(", ")}\n` +
      "   Set them in .env (local) or your hosting platform's env settings (production)."
  );
  process.exit(1);
}

console.log("✅ Environment variables loaded successfully");
