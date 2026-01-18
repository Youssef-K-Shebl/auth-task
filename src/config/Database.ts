import { Sequelize } from "sequelize-typescript";
import { User } from "../models/UserModel";
import { setting } from "./Setting";
import { Domain } from "../models/DomainModel";
import { DomainRecord } from "../models/DomainRecordModel";

export const sequelize = new Sequelize({
  dialect: setting.DATABASE_TYPE,
  host: setting.DATABASE_HOST,
  username: setting.DATABASE_USERNAME,
  password: setting.DATABASE_PASSWORD,
  database: setting.DATABASE_NAME,
  models: [User, Domain, DomainRecord],
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
