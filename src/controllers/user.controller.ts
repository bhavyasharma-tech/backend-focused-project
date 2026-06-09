import { Request, Response } from "express";
import User from "../models/user.model";

export const createUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password
        });
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
        const users = await User.findAll();
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
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user = await User.findByPk(id);

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
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        await user.destroy();

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