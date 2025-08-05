import { config } from "./config.js";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.mongoURI}/${DB_NAME}`
    );
    console.log(
      chalk.green.bold(
        `✅ MongoDB connected successfully at ${connectionInstance.connection.host}/${DB_NAME}`
      )
    );
  } catch (error) {
    console.error(chalk.red(`❌ MongoDB Connection Failed || ${error}`));
    process.exit(1);
  }
};
