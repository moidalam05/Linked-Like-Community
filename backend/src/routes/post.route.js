import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.valodator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsOfUser,
  updatePost,
} from "../controllers/post.controller.js";
const Router = express.Router();

Router.route("/").post(validate(createPostSchema), authMiddleware, createPost);
Router.route("/").get(getAllPosts);
Router.route("/user/:id").get(getAllPostsOfUser);
Router.route("/:id").patch(
  validate(updatePostSchema),
  authMiddleware,
  updatePost
);
Router.route("/:id").delete(authMiddleware, deletePost);

export default Router;
