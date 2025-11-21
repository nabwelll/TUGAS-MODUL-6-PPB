import express from "express";
import { AuthController } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";
import { authLimiter, apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/login", authLimiter, AuthController.login);
router.get("/verify", apiLimiter, authenticateToken, AuthController.verify);

export default router;
