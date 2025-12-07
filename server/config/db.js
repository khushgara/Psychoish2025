import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "khushagra007",
  database: process.env.DB_NAME || "psychoish_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Get promise-based connection
const db = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
    connection.release();
  }
});

export default db;
