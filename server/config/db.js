import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("Connecting to Database at:", process.env.DB_HOST);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "khushagra007",
  database: process.env.DB_NAME || "psychoish_db",
  port: parseInt(process.env.DB_PORT) || 3306,
});

// Test connection immediately
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL Database");
    conn.release();
    
    // Create subscribers table if not exists
    const createSubscribersTable = `
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createSubscribersTable);
    console.log("✅ Subscribers table verified/created");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

export default pool;
