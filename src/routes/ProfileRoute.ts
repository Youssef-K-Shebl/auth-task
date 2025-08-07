import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { ProfileController } from "../controllers/ProfileController";
import { setting } from "../config/Setting";

export const router = express.Router();

const controller = new ProfileController();

router.use(authMiddleware);

// Upload profile image
router.post("/upload-image", multer().single("profileImage"), controller.uploadProfileImage);

// Get user profile
router.get("/", controller.getProfile);
