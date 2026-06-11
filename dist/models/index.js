"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = exports.Course = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const course_model_1 = __importDefault(require("./course.model"));
exports.Course = course_model_1.default;
const enrollment_model_1 = __importDefault(require("./enrollment.model"));
exports.Enrollment = enrollment_model_1.default;
user_model_1.default.belongsToMany(course_model_1.default, {
    through: enrollment_model_1.default,
});
course_model_1.default.belongsToMany(user_model_1.default, {
    through: enrollment_model_1.default,
});
