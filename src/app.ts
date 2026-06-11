import express from "express";
import userRoutes from "./routes/user.routes"
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";

const app = express();

app.use(express.json())
app.use("/api/users",userRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;