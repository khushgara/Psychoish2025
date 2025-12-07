import express from "express";
import authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected routes
router.get("/me", verifyToken, authController.getCurrentUser);

export default router;

