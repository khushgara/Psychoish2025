import express from "express";
import profileController from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected - require authentication

// Get user profile
router.get("/", verifyToken, profileController.getProfile);

// Update user profile
router.put("/", verifyToken, profileController.updateProfile);

export default router;
