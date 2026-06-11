"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.getUserByIdService = exports.getAllUsersService = exports.createUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const redis_1 = require("../config/redis");
const createUserService = async (name, email, password) => {
    return await user_model_1.default.create({
        name,
        email,
        password,
    });
};
exports.createUserService = createUserService;
const getAllUsersService = async () => {
    const cachedUsers = await redis_1.redisClient.get("users");
    if (cachedUsers) {
        console.log("Cache Hit");
        return JSON.parse(cachedUsers);
    }
    console.log("cache miss");
    const users = await user_model_1.default.findAll();
    await redis_1.redisClient.set("users", JSON.stringify(users), { EX: 60 });
    return users;
};
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = async (id) => {
    return await user_model_1.default.findByPk(id);
};
exports.getUserByIdService = getUserByIdService;
const deleteUserService = async (id) => {
    const user = await user_model_1.default.findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    await user.destroy();
};
exports.deleteUserService = deleteUserService;
