"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userValidator_1 = require("../validators/userValidator");
const validate_1 = require("../middlewares/validate");
exports.router = express_1.default.Router();
const controller = new authController_1.AuthController();
exports.router.post("/login", userValidator_1.loginValidator, validate_1.validate, controller.login);
exports.router.post("/signup", userValidator_1.signupValidator, validate_1.validate, controller.signup);
//# sourceMappingURL=authRoute.js.map