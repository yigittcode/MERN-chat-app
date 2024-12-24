import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { body } from "express-validator";


const router = express.Router();


router.post("/signup", [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().notEmpty().isEmail().withMessage("Please enter a valid email"),
    body("password")
        .trim()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
], signup);

router.post("/login", login);

router.post("/logout", logout);


export default router;