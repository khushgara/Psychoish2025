import express from "express";
import newsletterController from "../controllers/newsletterController.js";

const router = express.Router();

// Public route for newsletter subscription
router.post("/subscribe", newsletterController.subscribe);

export default router;
