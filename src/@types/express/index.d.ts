import { IAuthContext } from "../../interfaces/IAuthContext";

declare module "express" {
  interface Request {
    AuthContext?: IAuthContext;
  }
}
