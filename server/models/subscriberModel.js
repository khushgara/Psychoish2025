import mongoose from "mongoose";

// ── Schema ────────────────────────────────────────────────────────────────────
const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  {
    timestamps: { createdAt: "subscribed_at", updatedAt: false },
  }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// ── Model API ─────────────────────────────────────────────────────────────────
const SubscriberModel = {
  // Add a new subscriber — returns the new document's id
  async create(email) {
    const doc = await Subscriber.create({ email });
    return doc._id.toString();
  },

  // Find subscriber by email
  async findByEmail(email) {
    return Subscriber.findOne({ email }).lean();
  },

  // Get all subscribers ordered by newest first
  async getAll() {
    return Subscriber.find().sort({ subscribed_at: -1 }).lean();
  },
};

export default SubscriberModel;
