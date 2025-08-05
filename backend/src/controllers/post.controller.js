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

  const populatedPost = await Post.findById(post._id).populate(
    "author",
    "name"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedPost, "Post created successfully"));
});

// get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "name");

  if (posts.length === 0) {
    throw new ApiError("No posts found", 404);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All posts fetched successfully"));
});

// get all post of specific user
export const getAllPostsOfUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const posts = await Post.find({ author: userId })
    .sort({ createdAt: -1 })
    .populate("author", "name");

  if (posts.length === 0) {
    throw new ApiError("No posts found", 404);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All Your Posts fetched successfully"));
});

// update post
export const updatePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError("Post not found", 404);
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError("You are not authorized to update this post", 403);
  }

  post.content = content;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// delete post
export const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError("Post not found", 404);
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError("You are not authorized to delete this post", 403);
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});
