"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
class AuthService {
    // Example method
    login(loginBody) {
        // Implement login logic
        return `Username is ${loginBody.username} and password is ${loginBody.password}`; // Placeholder for successful login
    }
    async signup(signUpBody) {
        return await user_model_1.User.create({ username: signUpBody.username, password: signUpBody.password, email: signUpBody.email });
        // Implement login logic
        // return `Username is ${signUpBody.username} and password is ${signUpBody.password} and email is ${signUpBody.email}`; // Placeholder for successful signup
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map