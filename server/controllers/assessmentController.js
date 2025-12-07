import AssessmentModel from "../models/AssessmentModel.js";
import ResultModel from "../models/ResultModel.js";
import assessmentQuestions from "../data/assessmentQuestions.js";

const assessmentController = {
  // Get all assessment types with metadata
  getAssessmentTypes(req, res) {
    try {
      const types = Object.keys(assessmentQuestions).map((key) => ({
        type: key,
        name: assessmentQuestions[key].name,
        description: assessmentQuestions[key].description,
        duration: assessmentQuestions[key].duration,
        questionCount: assessmentQuestions[key].questions.length,
      }));

      res.json({
        success: true,
        assessments: types,
      });
    } catch (error) {
      console.error("❌ Get assessment types error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get questions for a specific assessment type
  getAssessmentQuestions(req, res) {
    try {
      const { type } = req.params;
      console.log(`📋 Fetching questions for assessment type: ${type}`);
      console.log(`📦 Available assessment types:`, Object.keys(assessmentQuestions));

      if (!assessmentQuestions[type]) {
        console.log(`❌ Assessment type "${type}" not found`);
        return res.status(404).json({
          success: false,
          message: "Assessment type not found",
        });
      }

      console.log(`✅ Found assessment: ${assessmentQuestions[type].name}`);
      console.log(`📝 Number of questions: ${assessmentQuestions[type].questions.length}`);

      res.json({
        success: true,
        data: assessmentQuestions[type],
      });
    } catch (error) {
      console.error("❌ Get assessment questions error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },


  // Calculate score based on assessment type
  calculateScore(assessmentType, responses) {
    let score = 0;

    switch (assessmentType) {
      case "mood":
      case "anxiety":
        // Sum all response values
        score = responses.reduce((sum, response) => sum + response.value, 0);
        break;

      case "dast10":
        // Yes/No scoring with reversed questions
        responses.forEach((response, index) => {
          const question = assessmentQuestions.dast10.questions[index];
          if (question.reversed) {
            // For reversed questions, "no" scores 1
            score += response.value === "no" ? 1 : 0;
          } else {
            // For normal questions, "yes" scores 1
            score += response.value === "yes" ? 1 : 0;
          }
        });
        break;

      case "wellbeing":
        // Sum all response values (already includes reversed scoring in the data)
        score = responses.reduce((sum, response) => sum + response.value, 0);
        break;

      case "ybocs":
        // Sum all response values
        score = responses.reduce((sum, response) => sum + response.value, 0);
        break;

      default:
        throw new Error("Unknown assessment type");
    }

    return score;
  },

  // Submit assessment
  async submitAssessment(req, res) {
    try {
      const { assessmentType, responses } = req.body;
      const userId = req.user.id;

      // Validate input
      if (!assessmentType || !responses || !Array.isArray(responses)) {
        return res.status(400).json({
          success: false,
          message: "Invalid assessment data",
        });
      }

      // Validate assessment type
      if (!assessmentQuestions[assessmentType]) {
        return res.status(400).json({
          success: false,
          message: "Invalid assessment type",
        });
      }

      // Calculate score
      const score = this.calculateScore(assessmentType, responses);

      // Get interpretation
      const interpretation = ResultModel.getInterpretation(
        assessmentType,
        score
      );

      // Get recommendations
      const recommendations = ResultModel.getRecommendations(
        assessmentType,
        score,
        interpretation
      );

      // Save to database
      const assessmentId = await AssessmentModel.create(
        userId,
        assessmentType,
        responses,
        score,
        interpretation.label,
        JSON.stringify(recommendations)
      );

      console.log(
        `✅ Assessment submitted: ${assessmentType} for user ${userId}`
      );

      res.status(201).json({
        success: true,
        message: "Assessment submitted successfully",
        result: {
          id: assessmentId,
          assessmentType,
          score,
          interpretation,
          recommendations,
        },
      });
    } catch (error) {
      console.error("❌ Submit assessment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while submitting assessment",
      });
    }
  },

  // Get assessment history for user
  async getAssessmentHistory(req, res) {
    try {
      const userId = req.user.id;
      const { type } = req.query;

      const assessments = await AssessmentModel.getUserAssessments(
        userId,
        type || null
      );

      res.json({
        success: true,
        assessments,
      });
    } catch (error) {
      console.error("❌ Get assessment history error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get specific assessment by ID
  async getAssessmentById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const assessment = await AssessmentModel.findById(id);

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

      // Parse recommendations if stored as string
      if (typeof assessment.recommendations === "string") {
        assessment.recommendations = JSON.parse(assessment.recommendations);
      }

      res.json({
        success: true,
        assessment,
      });
    } catch (error) {
      console.error("❌ Get assessment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get assessment statistics
  async getStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await AssessmentModel.getStats(userId);

      res.json({
        success: true,
        stats,
      });
    } catch (error) {
      console.error("❌ Get stats error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Delete assessment
  async deleteAssessment(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deleted = await AssessmentModel.delete(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found or already deleted",
        });
      }

      res.json({
        success: true,
        message: "Assessment deleted successfully",
      });
    } catch (error) {
      console.error("❌ Delete assessment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default assessmentController;
