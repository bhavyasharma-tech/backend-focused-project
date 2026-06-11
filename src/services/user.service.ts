import  User  from "../models/user.model";
import { redisClient } from "../config/redis";

export const createUserService = async (
  name: string,
  email: string,
  password: string
) => {
  return await User.create({
    name,
    email,
    password,
  });
};

export const getAllUsersService = async () => {
  try {
    if (redisClient.isOpen) {
      const cachedUsers = await redisClient.get("users");

      if (cachedUsers) {
        console.log("Cache Hit");
        return JSON.parse(cachedUsers);
      }

      console.log("Cache Miss");
    }

    const users = await User.findAll();

    if (redisClient.isOpen) {
      await redisClient.set(
        "users",
        JSON.stringify(users),
        { EX: 60 }
      );
    }

    return users;
  } catch (error) {
    console.error("Redis error:", error);

    return await User.findAll();
  }
};

export const getUserByIdService = async (
  id: number
) => {
  return await User.findByPk(id);
};

export const deleteUserService = async (
  id: number
) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
};

