import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { SignupDto } from "../dto/Signup.dto";
import { LoginDto } from "../dto/Login.dto";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Example method
  signup = async (req: Request, res: Response) => {
    const signupBody: SignupDto = req.body;
    try {
      const result = await this.authService.signup(signupBody);
      res.status(200).json({ message: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const loginBody: LoginDto = req.body;
    try {
      const result = await this.authService.login(loginBody);
      res.status(200).json({ user: result.user, tokens: result.tokens });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  profile = async (req: any, res: Response) => {
    return res.status(200).json({
      user: req.user,
    });
  };

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
      const result = await this.authService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };
}
