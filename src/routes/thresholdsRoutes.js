import express from "express";
import { ThresholdsController } from "../controllers/thresholdsController.js";
import { authenticateToken } from "../middleware/auth.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/", ThresholdsController.list);
router.post("/", apiLimiter, authenticateToken, ThresholdsController.create);
router.get("/latest", ThresholdsController.latest);

export default router;
