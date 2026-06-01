import mongoose from "mongoose";

// ── Schema ────────────────────────────────────────────────────────────────────
const consultationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    consultation_type: { type: String, required: true },
    description: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

consultationSchema.index({ user_id: 1 });
consultationSchema.index({ status: 1 });

const Consultation = mongoose.model("Consultation", consultationSchema);

// ── Model API ─────────────────────────────────────────────────────────────────
const ConsultationModel = {
  // Create a new booking — returns the new document's id
  async create(bookingData) {
    const { user_id, name, email, phone, consultation_type, description } = bookingData;
    const doc = await Consultation.create({
      user_id: user_id || null,
      name,
      email,
      phone,
      consultation_type,
      description: description || null,
    });
    return doc._id.toString();
  },

  // Get all bookings for a user
  async findByUserId(userId) {
    return Consultation.find({ user_id: userId }).sort({ createdAt: -1 }).lean();
  },

  // Get a single booking by ID
  async findById(id) {
    return Consultation.findById(id).lean();
  },
};

export default ConsultationModel;
