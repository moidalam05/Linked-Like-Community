import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
  httpOnly: true,
  secure: false,
  maxAge: 24 * 60 * 60 * 1000,
};

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
