import db from "../config/db.js";

const listSubscribers = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM subscribers");
    console.log("Subscribers recorded in DB:", rows);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

listSubscribers();
