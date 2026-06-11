import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_URL as string,
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export const connectDB = async () => {
  let retries = 10;

  while (retries > 0) {
    try {
      await sequelize.authenticate();

      console.log("PostgreSQL connected successfully");

      return;
    } catch (error) {
      retries--;

      console.log(
        `Database not ready. Retrying in 5 seconds... (${retries} attempts left)`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      );
    }
  }

  throw new Error(
    "Could not connect to PostgreSQL after multiple attempts"
  );
};