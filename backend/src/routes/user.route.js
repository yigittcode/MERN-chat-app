import express from "express";
import { getUserProfile, updateUserProfile, getUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../lib/middlewares/auth.middleware.js";
const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);
router.get("/getUsers", protectRoute, getUsers);
export default router;