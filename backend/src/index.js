import { config } from "./config/config.js";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import chalk from "chalk";

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        chalk.green.bold(
          `🚀 Server is running on http://localhost:${config.port} [${config.env}]`
        )
      );
    });
  })
  .catch((error) => {
    console.error(chalk.red("Database connection failed:", error));
    process.exit(1);
  });
