import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const config = {
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
  clientURI: process.env.CLIENT_URI,
  env: process.env.NODE_ENV || "development",
};
