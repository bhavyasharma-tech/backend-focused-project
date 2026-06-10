import  User  from "../models/user.model";

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
  return await User.findAll();
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

