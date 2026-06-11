import app from "./app";
import { connectDB, sequelize } from "./config/db";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDB();
        if (process.env.REDIS_URL) {
            await connectRedis();
        }

        await sequelize.sync();
        console.log(sequelize.models)
        console.log("Tables synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();
