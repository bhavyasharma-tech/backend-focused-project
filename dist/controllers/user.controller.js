"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, user_service_1.createUserService)(name, email, password);
        res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
        console.log(err);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsersService)();
        res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await (0, user_service_1.getUserByIdService)(Number(req.params.id));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};
exports.getUserById = getUserById;
const deleteUser = async (req, res) => {
    try {
        await (0, user_service_1.deleteUserService)(Number(req.params.id));
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
