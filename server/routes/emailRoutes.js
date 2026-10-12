import express from "express";
import {
  generateEmailController,
  generateSmartReplyController,
  getEmailHistory,
  deleteEmail,
  updateEmail,
} from "../controllers/emailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate-email", protect, generateEmailController);
router.post("/smart-reply", protect, generateSmartReplyController);
router.get("/history", protect, getEmailHistory);
router.delete("/history/:id", protect, deleteEmail);
router.put("/history/:id", protect, updateEmail);

export default router;