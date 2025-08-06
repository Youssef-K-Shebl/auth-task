import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";
export const authMiddleware = async (req: Request, res: Response, next: Function) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ error: "You are not logged in! Please log in to get access." });

  // 2) Verification token
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "secret");
    const currentUser = await User.findOne({ where: { id: decoded.id } });
    if (!currentUser) {
      return res.status(401).json({ error: "The user belonging to this token does no longer exist." });
    }
    const { password, ...safeUserData } = currentUser.get();
    (req as any).user = safeUserData;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
