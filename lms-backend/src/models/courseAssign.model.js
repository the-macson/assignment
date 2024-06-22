const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Course = require("./course.model");
const User = require("./user.model");
const CourseAssign = sequelize.define(
  "CourseAssign",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Course.belongsToMany(User, {
  through: CourseAssign,
  foreignKey: "courseId",
});

User.belongsToMany(Course, {
  through: CourseAssign,
  foreignKey: "userId",
});

Course.hasMany(CourseAssign, {
  foreignKey: "courseId",
  as: "courseAssign",
});

User.hasMany(CourseAssign, {
  foreignKey: "userId",
  as: "courseAssign",
});

CourseAssign.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

CourseAssign.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = CourseAssign;
