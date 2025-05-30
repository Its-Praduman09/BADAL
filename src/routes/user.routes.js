import express from "express";
const router = express.Router();

import {
  createUserHandler,
  getAllUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";
import { AuthMiddleware } from "../middleware/auth.js";

router
  .route("/")
  .all(AuthMiddleware)
  .post(createUserHandler)
  .get(getAllUserHandler);

router
  .route("/:id")
  .all(AuthMiddleware)
  .get(getUserByIdHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

export default router;
