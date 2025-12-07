import express from "express";
import assessmentController from "../controllers/assessmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected - require authentication

// Get all assessment types
router.get("/types", verifyToken, assessmentController.getAssessmentTypes);

// Get questions for specific assessment type
router.get("/questions/:type", verifyToken, assessmentController.getAssessmentQuestions);

// Submit assessment
router.post("/submit", verifyToken, assessmentController.submitAssessment);

// Get assessment history
router.get("/history", verifyToken, assessmentController.getAssessmentHistory);

// Get assessment statistics
router.get("/stats", verifyToken, assessmentController.getStats);

// Get specific assessment by ID
router.get("/:id", verifyToken, assessmentController.getAssessmentById);

// Delete assessment
router.delete("/:id", verifyToken, assessmentController.deleteAssessment);

export default router;
