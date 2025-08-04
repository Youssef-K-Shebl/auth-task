import { body } from "express-validator";

export const signupValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
