import express from "express";
import "./models/user.model";
import "./models/course.model";
import "./models/enrollment.model";
import "./models";
import { sequelize, connectDB } from "./config/db";
import userRoutes from "./routes/user.routes"
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/users",userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync({force:true});
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
