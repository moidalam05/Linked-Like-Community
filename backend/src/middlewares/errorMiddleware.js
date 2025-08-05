import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      stack: config.env === "development" ? err.stack : {},
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    stack: config.env === "development" ? err.stack : {},
  });
};
