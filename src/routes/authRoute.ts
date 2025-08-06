import express from "express";
import { loginValidator, signupValidator } from "../validators/userValidator";
import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
import { AuthController } from "../controllers/authController";

export const router = express.Router();

const controller = new AuthController();
router.post("/login", loginValidator, validate, controller.login);

router.post("/signup", signupValidator, validate, controller.signup);

router.get("/profile", authMiddleware, controller.profile);

router.post("/refresh-token", controller.refreshToken);
