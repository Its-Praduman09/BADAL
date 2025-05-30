import db from "../models/index.js";
const { Users } = db;
import bcrypt from "bcryptjs";

console.log("USER", Users);

export const createUserService = async (req) => {
  try {
    const { name, email, phone, password, country_code } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await Users.create({
      name,
      email,
      phone,
      password: hashedPassword,
      country_code,
    });

    const userData = newUser.toJSON();
    delete userData.password;

    return userData;
  } catch (error) {
    return {
      status: 400,
      message: "Error creating user",
      errors: { general: error.message },
    };
  }
};

export const getAllUserService = async (req) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password", "created_at", "updated_at"] },
      order: [["created_at", "DESC"]],
    });
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserByIdService = async (id) => {
  try {
    const user = await Users.findOne({
      where: { id, status: 0 },
      attributes: { exclude: ["password", "created_at", "updated_at"] },
    });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const updateUserService = async (id, data) => {
  try {
    const user = await Users.findOne({ where: { id, status: 0 } });
    if (!user) {
      return { status: 404, message: "User not found " };
    }
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    await Users.update(data, { where: { id, status: 0 } });
    const updatedUser = await Users.findOne({
      where: { id, status: 0 },
      attributes: { exclude: ["password", "created_at", "updated_at"] },
    });
    return updatedUser;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const deleteUserService = async (id) => {
  try {
    const user = await Users.findOne({ where: { id, status: 0 } });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    await Users.update({ status: 1 }, { where: { id } });
    return { message: "User deleted successfully" };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
