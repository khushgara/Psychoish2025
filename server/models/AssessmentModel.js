import mongoose from "mongoose";

// ── Schema ────────────────────────────────────────────────────────────────────
const assessmentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assessment_type: { type: String, required: true },
    responses: { type: mongoose.Schema.Types.Mixed, required: true },
    score: { type: Number, required: true },
    interpretation: { type: String, required: true },
    recommendations: { type: String, default: null },
  },
  { timestamps: true }
);

// Indexes to mirror the SQL indexes
assessmentSchema.index({ user_id: 1, createdAt: -1 });
assessmentSchema.index({ assessment_type: 1 });

const Assessment = mongoose.model("Assessment", assessmentSchema);

// ── Model API ─────────────────────────────────────────────────────────────────
const AssessmentModel = {
  // Create new assessment — returns new document id
  async create(userId, assessmentType, responses, score, interpretation, recommendations) {
    const doc = await Assessment.create({
      user_id: userId,
      assessment_type: assessmentType,
      responses,
      score,
      interpretation,
      recommendations: recommendations || null,
    });
    return doc._id.toString();
  },

  // Get assessment by ID
  async findById(id) {
    return Assessment.findById(id).lean();
  },

  // Get user's assessment history (optionally filtered by type)
  async getUserAssessments(userId, assessmentType = null) {
    const filter = { user_id: userId };
    if (assessmentType) filter.assessment_type = assessmentType;
    return Assessment.find(filter).sort({ createdAt: -1 }).lean();
  },

  // Get the latest assessment of a specific type
  async getLatestByType(userId, assessmentType) {
    return Assessment.findOne({ user_id: userId, assessment_type: assessmentType })
      .sort({ createdAt: -1 })
      .lean();
  },

  // Get per-type statistics for a user
  async getStats(userId) {
    return Assessment.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$assessment_type",
          count: { $sum: 1 },
          avg_score: { $avg: "$score" },
          last_taken: { $max: "$createdAt" },
        },
      },
      { $project: { assessment_type: "$_id", count: 1, avg_score: 1, last_taken: 1, _id: 0 } },
    ]);
  },

  // Delete an assessment (must belong to the requesting user)
  async delete(id, userId) {
    const result = await Assessment.deleteOne({ _id: id, user_id: userId });
    return result.deletedCount > 0;
  },
};

export default AssessmentModel;
