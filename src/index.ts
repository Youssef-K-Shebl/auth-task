import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { router as AuthRouter } from "./routes/AuthRoute";
import { router as ProfileRouter } from "./routes/ProfileRoute";
import { connectDatabase, sequelize } from "./config/Database";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";
import { setting } from "./config/Setting";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});

app.use("/auth", AuthRouter);
app.use("/profile", ProfileRouter);

app.use(ErrorHandlerMiddleware.exposableErrorHandler, ErrorHandlerMiddleware.errorHandler);

connectDatabase()
  .then(() => {
    sequelize.sync().then(() => {
      console.log("✅ All models were synchronized successfully.");
      app.listen(setting.PORT, () => {
        console.log(`Server running at http://localhost:${setting.PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
