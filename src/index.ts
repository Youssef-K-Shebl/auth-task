import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { router as authRouter } from "./routes/authRoute";
import { connectDatabase, sequelize } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});

app.use("/auth", authRouter);

connectDatabase()
  .then(() => {
    sequelize.sync().then(() => {
      console.log("✅ All models were synchronized successfully.");
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
