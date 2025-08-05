import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content cannot be empty")
    .max(500, "Content cannot be more than 500 characters"),
});

export const updatePostSchema = z.object({
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content cannot be empty")
    .max(500, "Content cannot be more than 500 characters"),
});
