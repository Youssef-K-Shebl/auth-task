import { NextFunction, Request, Response } from "express";
import SuccessResponse from "../dto/responses/SuccessResponse";
import { ProfileService } from "../services/ProfileService";

export class ProfileController {
  private readonly profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  uploadProfileImage = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const result = await this.profileService.uploadProfileImage(userId, req.file);
      res.status(200).json(SuccessResponse.of("Profile image uploaded successfully", result));
    } catch (error: any) {
      next(error);
    }
  };

  getProfile = async (req: any, res: Response, next: NextFunction) => {
    res.status(200).json(SuccessResponse.of("Profile retrieved successfully", req.user));
  };
}
