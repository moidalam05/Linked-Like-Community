import express from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";
import { registerUser } from "../controllers/user.controller.js";

const Router = express.Router();

Router.route("/register").post(validate(registerSchema), registerUser);
// Router.route("/login").post(validate(loginSchema));
// Router.route("/logout").post();
// Router.route("/profile").post();
// Router.route("/profile").patch();
// Router.route("/profile/:id").post();

export default Router;
