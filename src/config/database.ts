import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL || "mysql");

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
