const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Syllabus = require("./syllabus.model");
const FacultyAssign = require("./facultyAssign.model");
const FacultyInfo = require("./facultyInfo.model");
const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categories: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      defaultValue: "1",
    },
  },
  {
    timestamps: true,
  }
);

Course.hasMany(Syllabus, {
  foreignKey: "courseId",
  as: "syllabus",
});

Syllabus.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

Course.belongsToMany(FacultyInfo, {
    through: FacultyAssign,
    foreignKey: "courseId",
})

FacultyInfo.belongsToMany(Course, {
    through: FacultyAssign,
    foreignKey: "facultyId",
})

Course.hasMany(FacultyAssign, {
    foreignKey: "courseId",
    as: "facultyAssign",
})

FacultyAssign.belongsTo(Course, {
    foreignKey: "courseId",
    as: "course",
})

FacultyInfo.hasMany(FacultyAssign, {
    foreignKey: "facultyId",
    as: "facultyAssign",
})

FacultyAssign.belongsTo(FacultyInfo, {
    foreignKey: "facultyId",
    as: "faculty",
})

module.exports = Course;
