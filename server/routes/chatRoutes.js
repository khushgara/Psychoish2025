import express from "express";
import { chatWithAI, clearSession, getChatHistory } from "../controllers/chatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/message", chatWithAI);
router.post("/clear", clearSession);
router.get("/history", verifyToken, getChatHistory);

export default router;
