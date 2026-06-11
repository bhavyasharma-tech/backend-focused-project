"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
exports.redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});
const connectRedis = async () => {
    let retries = 10;
    while (retries > 0) {
        try {
            await exports.redisClient.connect();
            console.log("Redis connected successfully");
            return;
        }
        catch (error) {
            retries--;
            console.log(`Redis not ready. Retrying in 5 seconds... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
    throw new Error("Could not connect to Redis after multiple attempts");
};
exports.connectRedis = connectRedis;
