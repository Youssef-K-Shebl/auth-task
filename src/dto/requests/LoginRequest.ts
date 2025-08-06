import { body } from "express-validator";

export class LoginRequest {
  declare email: string;
  declare password: string;

  public static getValidationList() {
    return [
      body("email").isEmail().withMessage("Must be a valid email"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ];
  }
}
