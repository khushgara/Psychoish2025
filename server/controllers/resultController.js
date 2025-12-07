import ResultModel from "../models/ResultModel.js";
import AssessmentModel from "../models/AssessmentModel.js";

const resultController = {
  // Get formatted result for an assessment
  async getResult(req, res) {
    try {
      const { assessmentId } = req.params;
      const userId = req.user.id;

      const assessment = await AssessmentModel.findById(assessmentId);

      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
      }

      // Verify ownership
      if (assessment.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const result = await ResultModel.getFormattedResult(assessmentId);

      res.json({
        success: true,
        result,
      });
    } catch (error) {
      console.error("❌ Get result error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get dashboard summary
  async getDashboardSummary(req, res) {
    try {
      const userId = req.user.id;
      const summary = await ResultModel.getDashboardSummary(userId);

      res.json({
        success: true,
        summary,
      });
    } catch (error) {
      console.error("❌ Get dashboard summary error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get all results for user
  async getAllResults(req, res) {
    try {
      const userId = req.user.id;
      const assessments = await AssessmentModel.getUserAssessments(userId);

      // Format each result
      const results = assessments.map((assessment) => {
        const interpretation = ResultModel.getInterpretation(
          assessment.assessment_type,
          assessment.score
        );

        return {
          id: assessment.id,
          type: assessment.assessment_type,
          score: assessment.score,
          interpretation,
          date: assessment.created_at,
        };
      });

      res.json({
        success: true,
        results,
      });
    } catch (error) {
      console.error("❌ Get all results error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default resultController;
