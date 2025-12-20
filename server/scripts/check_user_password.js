import db from "../config/db.js";
import bcrypt from "bcrypt";

const checkUser = async () => {
  try {
    const email = "khushagra.final@gmail.com";
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    
    const [allUsers] = await db.execute("SELECT email FROM users");
    console.log("Existing emails:", allUsers.map(u => `'${u.email}'`));

    if (rows.length === 0) {
      console.log("❌ User not found by specific query");
      process.exit(0);
    }

    const user = rows[0];
    console.log("✅ User found:", user.name);
    console.log("📧 Email:", user.email);
    console.log("🔑 Password stored length:", user.password.length);
    console.log("🔑 Password starts with:", user.password.substring(0, 7)); // Check for $2b$ prefix
    
    // Check if it looks like a bcrypt hash (usually 60 chars, starts with $2b$)
    const isBcrypt = user.password.startsWith("$2b$") || user.password.startsWith("$2a$");
    console.log("❓ Looks like bcrypt hash:", isBcrypt);

    if (!isBcrypt) {
        console.log("⚠️ WARNING: Password does not resemble a valid bcrypt hash. It might be plain text.");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

checkUser();
