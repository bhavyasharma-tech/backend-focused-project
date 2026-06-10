import { Request, Response } from "express";
import User from "../models/user.model";
import { createUserService,
    getAllUsersService,
    getUserByIdService,
    deleteUserService,
 } from "../services/user.service";

export const createUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(
            name, email, password
        );
        res.status(201).json({
            success: true,
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
        console.log(err);
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({
            success: true,
            data: users
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await getUserByIdService(Number(req.params.id));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
    await deleteUserService(Number(req.params.id));

        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
}
