"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const express_validator_1 = require("express-validator");
class AuthController {
    constructor() {
        // Example method
        this.signup = (req, res) => {
            const signupBody = req.body;
            const result = this.authService.signup(signupBody);
            res.status(200).json({ message: result });
        };
        this.login = (req, res) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const loginBody = req.body;
            const result = this.authService.login(loginBody);
            res.status(200).json({ message: result });
        };
        this.authService = new authService_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map