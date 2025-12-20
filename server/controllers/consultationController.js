import ConsultationModel from "../models/consultationModel.js";
import sheetService from "../services/sheetService.js";

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

      // Create booking using Model
      const bookingId = await ConsultationModel.create({
        user_id: userId,
        name,
        email,
        phone,
        consultation_type,
        description
      });

      console.log(`✅ Consultation booked: ${consultation_type} for ${name}`);

      // Add to Google Sheet
      await sheetService.appendConsultation({
        name,
        email,
        phone,
        consultation_type,
        description,
      });

      res.status(201).json({
        success: true,
        message: "Consultation booked successfully. We will contact you soon!",
        bookingId: bookingId,
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

      const bookings = await ConsultationModel.findByUserId(userId);

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
