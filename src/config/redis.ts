import { createClient } from "redis";

export const redisClient = createClient({
  url:  process.env.REDIS_URL||"redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});


export const connectRedis = async () => {
  let retries = 10;

  while (retries > 0) {
    try {
      await redisClient.connect();
      console.log("Redis connected successfully");

      return;
    } catch (error) {
      retries--;

      console.log(
        `Redis not ready. Retrying in 5 seconds... (${retries} attempts left)`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      );
    }
  }

  throw new Error(
    "Could not connect to Redis after multiple attempts"
  );
};