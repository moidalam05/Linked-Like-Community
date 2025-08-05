import express from "express";
import { validate } from "../middlewares/validate.js";
import { createPostSchema } from "../validators/post.valodator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPost } from "../controllers/post.controller.js";
const Router = express.Router();

Router.route("/").post(validate(createPostSchema), authMiddleware, createPost);
// Router.route("/").get();
// Router.route("/user/:userId").get();
// Router.route("/:id").patch();
// Router.route("/:id").delete();

export default Router;
