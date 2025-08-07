import { User } from "../models/UserModel";
import ExposableError from "../error/ExposableError";
import { constants } from "http2";
import fs from "fs";
import path from "path";
import { setting } from "../config/Setting";

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class ProfileService {
  async uploadProfileImage(userId: number, file: UploadedFile): Promise<{ profileImage: string | null }> {
    try {
      // Check user existance in database
      const user = await User.findByPk(userId);
      if (!user) {
        throw new ExposableError("User not found", constants.HTTP_STATUS_NOT_FOUND);
      }

      // Validate file
      if (!file) {
        if (user.profileImage) {
          if (fs.existsSync(user.profileImage)) {
            fs.unlinkSync(user.profileImage);
          }
          await user.update({ profileImage: null });
          return { profileImage: null };
        }
        throw new ExposableError("No file uploaded", constants.HTTP_STATUS_BAD_REQUEST);
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        throw new ExposableError(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed",
          constants.HTTP_STATUS_BAD_REQUEST
        );
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new ExposableError("File size too large. Maximum size is 5MB", constants.HTTP_STATUS_BAD_REQUEST);
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = `${setting.UPLOAD_PATH}/profile-images`;
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `profile_${userId}_${Date.now()}${fileExtension}`;
      const filePath = path.join(uploadsDir, fileName);

      // Save file
      fs.writeFileSync(filePath, file.buffer);

      // Delete old profile image if exists
      if (user.profileImage) {
        if (fs.existsSync(user.profileImage)) {
          fs.unlinkSync(user.profileImage);
        }
      }

      // Update user with new profile image path
      const relativePath = `${uploadsDir}/${fileName}`;
      await user.update({ profileImage: relativePath });

      return { profileImage: relativePath };
    } catch (error: any) {
      if (error instanceof ExposableError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }
}
