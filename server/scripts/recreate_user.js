import db from "../config/db.js";
import bcrypt from "bcrypt";

const recreateUser = async () => {
  try {
    const email = "khushagra.final@gmail.com";
    const name = "Khushagra Sharma"; // restoring name I saw earlier
    const plainPassword = "password"; // Use a simple password for them to reset later

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Initial check
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
        console.log("User retrieved! (Strange, it was missing just now)");
        // Update password just in case
        await db.execute("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        console.log("✅ Password updated to 'password'");
    } else {
        // Create user
        const [result] = await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        console.log(`✅ User created! ID: ${result.insertId}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

recreateUser();
