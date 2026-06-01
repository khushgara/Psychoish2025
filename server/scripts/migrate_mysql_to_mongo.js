/**
 * migrate_mysql_to_mongo.js
 * ─────────────────────────────────────────────────────────────────────────────
 * One-time script: reads ALL data from MySQL (psychoish_db) and inserts it
 * into MongoDB (Psychoish_Database).
 *
 * HOW TO RUN:
 *   1. Make sure MySQL is still running locally.
 *   2. From the /server directory run:
 *        node scripts/migrate_mysql_to_mongo.js
 *
 * The script is safe to re-run — it skips rows that are already in MongoDB
 * (checked by email for users/subscribers, and by a composite key for others).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import mysql from "mysql2/promise";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// ── 1.  MySQL connection (old credentials hard-coded as fallback) ──────────
const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_MIGRATION_PASSWORD || "khushagra007",
  database: process.env.DB_MIGRATION_NAME || "psychoish_db",
  port: parseInt(process.env.DB_MIGRATION_PORT) || 3306,
});

// ── 2.  MongoDB connection ────────────────────────────────────────────────────
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/Psychoish_Database";

// ── 3.  Mongoose schemas (must match models exactly) ─────────────────────────

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    phone: { type: String, default: null },
    date_of_birth: { type: Date, default: null },
    gender: { type: String, default: null },
    bio: { type: String, default: null },
    avatar_url: { type: String, default: null },
  },
  { timestamps: true }
);

const assessmentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assessment_type: String,
    responses: mongoose.Schema.Types.Mixed,
    score: Number,
    interpretation: String,
    recommendations: { type: String, default: null },
  },
  { timestamps: true }
);

const consultationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name: String,
    email: String,
    phone: String,
    consultation_type: String,
    description: { type: String, default: null },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const subscriberSchema = new mongoose.Schema(
  { email: { type: String, unique: true, lowercase: true } },
  { timestamps: { createdAt: "subscribed_at", updatedAt: false } }
);

const User = mongoose.model("User", userSchema);
const Assessment = mongoose.model("Assessment", assessmentSchema);
const Consultation = mongoose.model("Consultation", consultationSchema);
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// ── helpers ───────────────────────────────────────────────────────────────────

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`);
}

// Build a map of MySQL user id → MongoDB ObjectId so we can re-link foreign keys
const mysqlIdToMongoId = new Map();

// ── 4.  Migration steps ───────────────────────────────────────────────────────

async function migrateUsers(conn) {
  log("👤", "Migrating users + user_profiles ...");

  const [users] = await conn.execute("SELECT * FROM users");
  const [profiles] = await conn.execute("SELECT * FROM user_profiles");

  // Build a lookup: mysql user_id → profile row
  const profileMap = {};
  for (const p of profiles) {
    profileMap[p.user_id] = p;
  }

  let inserted = 0;
  let skipped = 0;

  for (const u of users) {
    const profile = profileMap[u.id] || {};

    // Check if already migrated (match by email)
    const existing = await User.findOne({ email: u.email.toLowerCase() });
    if (existing) {
      mysqlIdToMongoId.set(u.id, existing._id);
      skipped++;
      continue;
    }

    const doc = await User.create({
      name: u.name,
      email: u.email.toLowerCase(),
      password: u.password,
      phone: profile.phone || null,
      date_of_birth: profile.date_of_birth || null,
      gender: profile.gender || null,
      bio: profile.bio || null,
      avatar_url: profile.avatar_url || null,
      createdAt: u.created_at,
      updatedAt: u.updated_at,
    });

    mysqlIdToMongoId.set(u.id, doc._id);
    inserted++;
  }

  log("✅", `Users: ${inserted} inserted, ${skipped} already existed.`);
}

async function migrateAssessments(conn) {
  log("📋", "Migrating assessments ...");

  const [rows] = await conn.execute(
    "SELECT * FROM assessments ORDER BY created_at ASC"
  );

  let inserted = 0;
  let skipped = 0;

  for (const r of rows) {
    const mongoUserId = mysqlIdToMongoId.get(r.user_id);

    // Skip if we couldn't map the user (shouldn't happen)
    if (!mongoUserId) {
      log("⚠️", `  Skipping assessment id=${r.id} — user ${r.user_id} not found`);
      skipped++;
      continue;
    }

    // Skip if exact duplicate (same user + type + score + same minute)
    const existing = await Assessment.findOne({
      user_id: mongoUserId,
      assessment_type: r.assessment_type,
      score: r.score,
      createdAt: new Date(r.created_at),
    });

    if (existing) {
      skipped++;
      continue;
    }

    let responses = r.responses;
    if (typeof responses === "string") {
      try {
        responses = JSON.parse(responses);
      } catch {
        /* leave as string */
      }
    }

    await Assessment.create({
      user_id: mongoUserId,
      assessment_type: r.assessment_type,
      responses,
      score: r.score,
      interpretation: r.interpretation,
      recommendations: r.recommendations || null,
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.created_at),
    });

    inserted++;
  }

  log("✅", `Assessments: ${inserted} inserted, ${skipped} skipped.`);
}

async function migrateConsultations(conn) {
  log("📅", "Migrating consultation bookings ...");

  const [rows] = await conn.execute(
    "SELECT * FROM consultation_bookings ORDER BY created_at ASC"
  );

  let inserted = 0;
  let skipped = 0;

  for (const r of rows) {
    const mongoUserId = r.user_id ? mysqlIdToMongoId.get(r.user_id) : null;

    const existing = await Consultation.findOne({
      email: r.email,
      consultation_type: r.consultation_type,
      createdAt: new Date(r.created_at),
    });

    if (existing) {
      skipped++;
      continue;
    }

    await Consultation.create({
      user_id: mongoUserId || null,
      name: r.name,
      email: r.email,
      phone: r.phone,
      consultation_type: r.consultation_type,
      description: r.description || null,
      status: r.status || "pending",
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.updated_at),
    });

    inserted++;
  }

  log("✅", `Consultations: ${inserted} inserted, ${skipped} skipped.`);
}

async function migrateSubscribers(conn) {
  log("📧", "Migrating newsletter subscribers ...");

  const [rows] = await conn.execute("SELECT * FROM subscribers");

  let inserted = 0;
  let skipped = 0;

  for (const r of rows) {
    const existing = await Subscriber.findOne({
      email: r.email.toLowerCase(),
    });

    if (existing) {
      skipped++;
      continue;
    }

    await Subscriber.create({
      email: r.email.toLowerCase(),
      subscribed_at: new Date(r.subscribed_at),
    });

    inserted++;
  }

  log("✅", `Subscribers: ${inserted} inserted, ${skipped} skipped.`);
}

// ── 5.  Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 Psychoish: MySQL → MongoDB Migration\n");

  // Connect MongoDB
  log("🔌", `Connecting to MongoDB: ${MONGO_URI}`);
  await mongoose.connect(MONGO_URI);
  log("✅", "MongoDB connected");

  // Connect MySQL
  log("🔌", "Connecting to MySQL ...");
  const conn = await mysqlPool.getConnection();
  log("✅", "MySQL connected");

  try {
    // Order matters: users first (so we have the ID map)
    await migrateUsers(conn);
    await migrateAssessments(conn);
    await migrateConsultations(conn);
    await migrateSubscribers(conn);

    console.log("\n🎉 Migration complete! All data is now in MongoDB.\n");
  } catch (err) {
    console.error("\n❌ Migration failed:", err);
  } finally {
    conn.release();
    await mysqlPool.end();
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
