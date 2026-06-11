"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
});
const connectDB = async () => {
    let retries = 10;
    while (retries > 0) {
        try {
            await exports.sequelize.authenticate();
            console.log("PostgreSQL connected successfully");
            return;
        }
        catch (error) {
            retries--;
            console.log(`Database not ready. Retrying in 5 seconds... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
    throw new Error("Could not connect to PostgreSQL after multiple attempts");
};
exports.connectDB = connectDB;
