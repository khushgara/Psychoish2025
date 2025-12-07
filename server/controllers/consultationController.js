import db from "../config/db.js";

const consultationController = {
  // Book consultation
  async bookConsultation(req, res) {
    try {
      const { name, email, phone, consultation_type, description } = req.body;
      const userId = req.user ? req.user.id : null; // Optional user ID if logged in

      // Validation
      if (!name || !email || !phone || !consultation_type) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be provided",
        });
      }

      // Insert booking
      const query = `
        INSERT INTO consultation_bookings 
        (user_id, name, email, phone, consultation_type, description, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `;

      const [result] = await db.execute(query, [
        userId,
        name,
        email,
        phone,
        consultation_type,
        description || null,
      ]);

      console.log(`✅ Consultation booked: ${consultation_type} for ${name}`);

      res.status(201).json({
        success: true,
        message: "Consultation booked successfully. We will contact you soon!",
        bookingId: result.insertId,
      });
    } catch (error) {
      console.error("❌ Book consultation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while booking consultation",
      });
    }
  },

  // Get user's consultation bookings
  async getUserBookings(req, res) {
    try {
      const userId = req.user.id;

      const query = `
        SELECT * FROM consultation_bookings 
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;

      const [bookings] = await db.execute(query, [userId]);

      res.json({
        success: true,
        bookings,
      });
    } catch (error) {
      console.error("❌ Get bookings error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default consultationController;
