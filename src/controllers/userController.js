import apiResponse from "../utils/apiResponse.js";
import {
  createUserService,
  getAllUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/userService.js";

export const createUserHandler = async (req, res) => {
  try {
    const user = await createUserService(req);
    if (!user || user.status === 400) {
      return res.status(400).json({
        status: 400,
        message: "User creation failed",
        data: {
          status: 400,
          message: user.message,
          errors: user.errors,
        },
      });
    }
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

export const getAllUserHandler = async (req, res) => {
  try {
    const users = await getAllUserService(req);
    apiResponse.success(res, users);
  } catch (error) {
    apiResponse.notFound(res, error.message);
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);
    if (user.status === 404) {
      return apiResponse.notFound(res, user.message);
    }
    if (user.status === 400) {
      return apiResponse.error(res, user.message);
    }
    return apiResponse.success(res, user);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await updateUserService(id, data);
    if (user.status === 404) {
      return apiResponse.notFound(res, user.message);
    }
    if (user.status === 400) {
      return apiResponse.error(res, user.message);
    }
    return apiResponse.success(res, user, "User updated successfully");
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUserService(id);
    if (result.status === 404) {
      return apiResponse.notFound(res, result.message);
    }
    if (result.status === 400) {
      return apiResponse.error(res, result.message);
    }
    return apiResponse.success(res, result, "User deleted successfully");
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};
