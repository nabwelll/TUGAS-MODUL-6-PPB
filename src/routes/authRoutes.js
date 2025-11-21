import express from "express";
import { AuthController } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/verify", authenticateToken, AuthController.verify);

export default router;
