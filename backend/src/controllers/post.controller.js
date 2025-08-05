import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create post
export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const post = await Post.create({
    content,
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});
