import express from "express";
import { chatWithAI, clearSession } from "../controllers/chatController.js";

const router = express.Router();

router.post("/message", chatWithAI);
router.post("/clear", clearSession);

export default router;
