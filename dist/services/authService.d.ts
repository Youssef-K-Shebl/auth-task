import { LoginDto } from "../dto/Login.dto";
import { SignupDto } from "../dto/Signup.dto";
import { User } from "../models/user.model";
export declare class AuthService {
    login(loginBody: LoginDto): string;
    signup(signUpBody: SignupDto): Promise<User>;
}
//# sourceMappingURL=authService.d.ts.map