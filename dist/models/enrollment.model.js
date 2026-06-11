"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Enrollment extends sequelize_1.Model {
}
Enrollment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Enrollment"
});
exports.default = Enrollment;
