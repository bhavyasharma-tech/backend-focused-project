import User from "./user.model";
import Course from "./course.model";
import Enrollment from "./enrollment.model";

User.belongsToMany(Course, {
  through: Enrollment,
});

Course.belongsToMany(User, {
  through: Enrollment,
});

export {
  User,
  Course,
  Enrollment,
};