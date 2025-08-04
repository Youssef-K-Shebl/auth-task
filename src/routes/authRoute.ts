import express from "express";
import { AuthController } from "../controllers/authController";
import { loginValidator, signupValidator } from "../validators/userValidator";
import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const router = express.Router();

const controller = new AuthController();
router.post("/login", loginValidator, validate, controller.login);

router.post("/signup", signupValidator, validate, controller.signup);

router.get("/profile", authMiddleware, controller.profile);

router.post("/refresh-token", controller.refreshToken);
