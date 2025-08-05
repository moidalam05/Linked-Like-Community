import mongoose from "mongoose";
import { minLength } from "zod";

// Post Schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Post content is required"],
      maxlength: [500, "Post content must be at most 500 characters"],
      trim: true,
      minLength: [10, "Post content must be at least 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = mongoose.model("Post", postSchema);
