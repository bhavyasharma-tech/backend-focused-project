import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Enrollment extends Model{}

Enrollment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
    },
    {
        sequelize,
        modelName:"Enrollment"
    }
)

export default Enrollment;