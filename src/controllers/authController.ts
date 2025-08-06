import { NextFunction, Request, Response } from "express";
import { SignupRequest } from "../dto/requests/SignupRequest";
import { LoginRequest } from "../dto/requests/LoginRequest";
import SuccessResponse from "../dto/responses/SuccessResponse";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Example method
  signup = async (req: Request, res: Response, next: NextFunction) => {
    const signupBody: SignupRequest = req.body;
    try {
      const result = await this.authService.signup(signupBody);
      res.status(200).json(SuccessResponse.of("Signup successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const loginBody: LoginRequest = req.body;
    try {
      const result = await this.authService.login(loginBody);
      res.status(200).json(SuccessResponse.of("Login successful", result));
    } catch (error: any) {
      next(error);
    }
  };

  profile = async (req: any, res: Response) => {
    return res.status(200).json({
      user: req.user,
    });
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    try {
      const result = await this.authService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  };
}
