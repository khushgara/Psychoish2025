import db from "../config/db.js";

const SubscriberModel = {
  // Add a new subscriber
  async create(email) {
    const query = "INSERT INTO subscribers (email) VALUES (?)";
    const [result] = await db.execute(query, [email]);
    return result.insertId;
  },

  // Find subscriber by email
  async findByEmail(email) {
    const query = "SELECT * FROM subscribers WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  // Get all subscribers
  async getAll() {
    const query = "SELECT * FROM subscribers ORDER BY subscribed_at DESC";
    const [rows] = await db.execute(query);
    return rows;
  }
};

export default SubscriberModel;
