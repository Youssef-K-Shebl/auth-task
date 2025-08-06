import { Sequelize } from "sequelize-typescript";
import { User } from "../models/UserModel";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "auth",
  models: [User],
});
// process.env.DATABASE_URL || "mysql"
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
