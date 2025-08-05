import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

// user authentication middleware
export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.authToken ??
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ApiError("Unauthorized: Token not found", 401);
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError("Unauthorized: User not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError("Unauthorized: Token invalid or expired", 401);
  }
});
