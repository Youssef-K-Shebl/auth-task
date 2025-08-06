import express from "express";
import { validate } from "../middlewares/ValidateMiddleware";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { AuthController } from "../controllers/AuthController";
import { LoginRequest } from "../dto/requests/LoginRequest";
import { SignupRequest } from "../dto/requests/SignupRequest";

export const router = express.Router();

const controller = new AuthController();
router.post("/login", LoginRequest.getValidationList(), validate, controller.login);

router.post("/signup", SignupRequest.getValidationList(), validate, controller.signup);

router.get("/profile", authMiddleware, controller.profile);

router.post("/refresh-token", controller.refreshToken);
