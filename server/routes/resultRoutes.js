import express from "express";
import resultController from "../controllers/resultController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected - require authentication

// Get dashboard summary
router.get("/dashboard", verifyToken, resultController.getDashboardSummary);

// Get all results
router.get("/all", verifyToken, resultController.getAllResults);

// Get specific result by assessment ID
router.get("/:assessmentId", verifyToken, resultController.getResult);

export default router;
