import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model{}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM("student","admin"),
            defaultValue:"student"
        }
    },
    {
        sequelize,
        modelName:"User"
    }
)

export default User;