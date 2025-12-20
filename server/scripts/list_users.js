import db from "../config/db.js";

const listUsers = async () => {
  try {
    const [rows] = await db.execute("SELECT id, name, email FROM users");
    console.log("Users:", rows);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

listUsers();
