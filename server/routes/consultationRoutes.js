import express from "express";
import consultationController from "../controllers/consultationController.js";
import { verifyToken, verifyTokenOptional } from "../middleware/authMiddleware.js";

const router = express.Router();

// Book consultation (can be used by both authenticated and non-authenticated users)
router.post("/book", verifyTokenOptional, consultationController.bookConsultation);

// Get user's bookings (protected)
router.get("/my-bookings", verifyToken, consultationController.getUserBookings);

export default router;
