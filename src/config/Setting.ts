import { Dialect } from "sequelize";
import ms from "ms";

class Setting {
  public readonly DATABASE_TYPE: Dialect;
  public readonly DATABASE_HOST: string;
  public readonly DATABASE_USERNAME: string;
  public readonly DATABASE_PASSWORD: string;
  public readonly DATABASE_NAME: string;

  public readonly PORT: string;

  public readonly JWT_SECRET: string;
  public readonly JWT_ACCESS_TOKEN_EXPIRES_IN: ms.StringValue;
  public readonly JWT_REFRESH_TOKEN_EXPIRES_IN: ms.StringValue;

  public readonly UPLOAD_PATH: string;

  constructor() {
    const requiredEnv = [
      "DATABASE_TYPE",
      "DATABASE_HOST",
      "DATABASE_USERNAME",
      "DATABASE_PASSWORD",
      "DATABASE_NAME",

      "PORT",

      "JWT_SECRET",
      "JWT_ACCESS_TOKEN_EXPIRES_IN",
      "JWT_REFRESH_TOKEN_EXPIRES_IN",

      "UPLOAD_PATH",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        console.error(`❌ Environment variable ${key} is required but not set.`);
        process.exit(1);
      }
    }

    this.DATABASE_TYPE = process.env.DATABASE_TYPE as Dialect;
    this.DATABASE_HOST = process.env.DATABASE_HOST as string;
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
    this.DATABASE_NAME = process.env.DATABASE_NAME as string;

    this.PORT = process.env.PORT as string;

    this.JWT_SECRET = process.env.JWT_SECRET as string;
    this.JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as ms.StringValue;
    this.JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as ms.StringValue;

    this.UPLOAD_PATH = process.env.UPLOAD_PATH as string;
  }
}

export const setting = new Setting();
