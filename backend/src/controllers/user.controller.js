import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "lax",
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio } = req.body;

  const alreadyExistingUser = await User.findOne({ email });
  if (alreadyExistingUser) {
    throw new ApiError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    bio,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError("User creation failed", 500);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError("email or password is incorrect", 401);
  }

  const token = user.generateToken();
  user.password = undefined;

  return res
    .cookie("authToken", token, options)
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});

// Logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

// User profile fetching
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, bio } = req.body;
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new ApiError("Email already in use", 400);
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (bio) user.bio = bio;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile updated successfully"));
});
