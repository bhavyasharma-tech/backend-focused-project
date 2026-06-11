"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const redis_1 = require("./config/redis");
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        await (0, redis_1.connectRedis)();
        await db_1.sequelize.sync();
        console.log(db_1.sequelize.models);
        console.log("Tables synced");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
startServer();
