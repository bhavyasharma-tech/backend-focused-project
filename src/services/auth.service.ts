import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser =
    await User.findOne({
      where: { email },
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginService = async (
  email: string,
  password: string
) => {
  const user =
    await User.findOne({
      where: { email },
    });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.getDataValue(
        "password"
      )
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    {
      id: user.getDataValue("id"),
      role: user.getDataValue("role"),
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

export const getCurrentUserService =
  async (userId: number) => {
    return await User.findByPk(
      userId
    );
  };