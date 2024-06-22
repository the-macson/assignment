const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const FacultyInfo = require("./facultyInfo.model");
const Course = require("./course.model");

const FacultyAssign = sequelize.define(
  "FacultyAssign",
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
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FacultyAssign;
