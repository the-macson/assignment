const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Lesson = require("./lessons.model");
const Syllabus = sequelize.define(
  "Syllabus",
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
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Syllabus.hasMany(Lesson, {
  foreignKey: "syllabusId",
  as: "lessons",
});

Lesson.belongsTo(Syllabus, {
  foreignKey: "syllabusId",
  as: "syllabus",
});

module.exports = Syllabus;
