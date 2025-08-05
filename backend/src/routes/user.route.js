import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.route("/register").post(validate(registerSchema), registerUser);
Router.route("/login").post(validate(loginSchema), loginUser);
Router.route("/logout").post(logoutUser);
Router.route("/profile").get(authMiddleware, getUserProfile);
Router.route("/profile").patch(authMiddleware, updateUserProfile);
// Router.route("/profile/:id").post();

export default Router;
