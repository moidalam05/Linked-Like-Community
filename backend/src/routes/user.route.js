import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
  updateUserProfileSchema,
  changePasswordSchema,
} from "../validators/user.validator.js";
import {
  changePassword,
  getPublicUserProfile,
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
Router.route("/profile").patch(
  validate(updateUserProfileSchema),
  authMiddleware,
  updateUserProfile
);
Router.route("/profile/:id").get(getPublicUserProfile);
Router.route("/change-password").patch(
  validate(changePasswordSchema),
  authMiddleware,
  changePassword
);

export default Router;
