import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Course extends Model{}

Course.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName:"Course"
    }
)

export default Course;