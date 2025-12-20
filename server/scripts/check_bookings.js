import db from "../config/db.js";

const checkBookings = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM consultation_bookings');
    console.log("Current Bookings:", JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkBookings();
