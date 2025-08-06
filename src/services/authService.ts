import { LoginRequest } from "../dto/requests/LoginRequest";
import { SignupRequest } from "../dto/requests/SignupRequest";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginResponse } from "../dto/responses/LoginResponse";
import { SignupResponse } from "../dto/responses/SignupResponse";
import ExposableError from "../error/ExposableError";

export class AuthService {
  async login(loginBody: LoginRequest): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: loginBody.email } });

    if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
      throw new ExposableError("Incorrect email or password", 400);
    }
    const { password, ...userWithoutPassword } = user.get();
    const tokens = this.createTokens(user.id);
    const loginResponse: LoginResponse = { user: userWithoutPassword, tokens };
    return loginResponse;
  }

  async signup(signUpBody: SignupRequest): Promise<SignupResponse> {
    const newUser = await User.create({
      username: signUpBody.username,
      password: signUpBody.password,
      email: signUpBody.email,
    });

    const { password, ...userWithoutPassword } = newUser.get();
    const signupResponse: SignupResponse = { user: userWithoutPassword };
    return signupResponse;
  }

  createTokens(userId: number): { accesstoken: string; refreshtoken: string } {
    const accesstoken = jwt.sign({ id: userId }, process.env.JWT_SECRET ?? "secret", { expiresIn: "15m" });
    const refreshtoken = jwt.sign({ id: userId }, process.env.JWT_SECRET ?? "secret", { expiresIn: "1d" });
    return { accesstoken, refreshtoken };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new ExposableError("Refresh token is required", 400);
    }

    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new ExposableError("User not found", 404);
      }

      const tokens = this.createTokens(user.id);

      return { tokens };
    } catch (err: any) {
      throw new ExposableError(err.message || "Invalid refresh token", err.statusCode || 400);
    }
  }
}
