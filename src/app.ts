import express from "express";
import "./models/user.model";
import "./models/course.model";
import "./models/enrollment.model";
import "./models";
import { sequelize, connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

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


