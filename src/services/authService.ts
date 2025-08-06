import { LoginRequest } from "../dto/requests/LoginRequest";
import { SignupRequest } from "../dto/requests/SignupRequest";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginResponse } from "../dto/responses/LoginResponse";
import { Signupresponse } from "../dto/responses/SignupResponse";

export class AuthService {
  async login(loginBody: LoginRequest): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: loginBody.email } });

    if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    const { password, ...userWithoutPassword } = user.get();
    const tokens = this.createTokens(user.id);
    const loginResponse: LoginResponse = { user: userWithoutPassword, tokens };
    return loginResponse;
  }

  async signup(signUpBody: SignupRequest): Promise<Signupresponse> {
    const newUser = await User.create({
      username: signUpBody.username,
      password: signUpBody.password,
      email: signUpBody.email,
    });

    const { password, ...userWithoutPassword } = newUser.get();
    const signupResponse: Signupresponse = userWithoutPassword;
    return signupResponse;
  }

  createTokens(userId: number): { accesstoken: string; refreshtoken: string } {
    const accesstoken = jwt.sign({ id: userId }, process.env.JWT_SECRET ?? "secret", { expiresIn: "15m" });
    const refreshtoken = jwt.sign({ id: userId }, process.env.JWT_SECRET ?? "secret", { expiresIn: "1d" });
    return { accesstoken, refreshtoken };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      return { message: "Refresh token is required" };
    }

    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

      const user = await User.findByPk(decoded.id);

      if (!user) {
        return { message: "User not found" };
      }

      const tokens = this.createTokens(user.id);

      return { tokens };
    } catch (err) {
      console.error("Refresh token error:", err);
      return { message: "Invalid refresh token" };
    }
  }
}
