import db from "../config/db.js";

const ConsultationModel = {
  // Create new consultation booking
  async create(bookingData) {
    const { user_id, name, email, phone, consultation_type, description } = bookingData;
    
    const query = `
      INSERT INTO consultation_bookings 
      (user_id, name, email, phone, consultation_type, description, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;

    const [result] = await db.execute(query, [
      user_id || null,
      name,
      email,
      phone,
      consultation_type,
      description || null,
    ]);
    
    return result.insertId;
  },

  // Get bookings by user ID
  async findByUserId(userId) {
    const query = `
      SELECT * FROM consultation_bookings 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  // Get booking by ID
  async findById(id) {
    const query = "SELECT * FROM consultation_bookings WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }
};

export default ConsultationModel;
