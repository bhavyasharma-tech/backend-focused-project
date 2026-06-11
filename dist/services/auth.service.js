"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserService = exports.loginService = exports.registerService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerService = async (name, email, password) => {
    const existingUser = await user_model_1.default.findOne({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    return user;
};
exports.registerService = registerService;
const loginService = async (email, password) => {
    const user = await user_model_1.default.findOne({
        where: { email },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.getDataValue("password"));
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.getDataValue("id"),
        role: user.getDataValue("role"),
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};
exports.loginService = loginService;
const getCurrentUserService = async (userId) => {
    return await user_model_1.default.findByPk(userId);
};
exports.getCurrentUserService = getCurrentUserService;
