import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../lib/middlewares/auth.middleware.js";
const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);

export default router;