import { body } from "express-validator";

export class SignupRequest {
  declare username: string;
  declare email: string;
  declare password: string;

  public static getValidationList() {
    return [
      body("username").notEmpty().withMessage("Username is required"),
      body("email").isEmail().withMessage("Must be a valid email"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ];
  }
}
