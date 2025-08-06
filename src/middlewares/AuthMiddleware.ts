import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";
import ExposableError from "../error/ExposableError";
import { constants } from "http2";

export const authMiddleware = async (req: Request, res: Response, next: Function) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    throw new ExposableError("You are not logged in! Please log in to get access.", constants.HTTP_STATUS_UNAUTHORIZED);

  // 2) Verification token
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "secret");
    const currentUser = await User.findOne({ where: { id: decoded.id } });
    if (!currentUser) {
      throw new ExposableError(
        "The user belonging to this token does no longer exist.",
        constants.HTTP_STATUS_NOT_FOUND
      );
    }
    const { password, ...safeUserData } = currentUser.get();
    (req as any).user = safeUserData;
    next();
  } catch (error: any) {
    throw new ExposableError(error.message || "Invalid token", error.statusCode || 400);
  }
};
