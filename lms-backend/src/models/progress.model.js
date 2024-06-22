const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Lesson = require("./lessons.model");
const User = require("./user.model");
const Progress = sequelize.define(
  "Progress",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Lesson.belongsToMany(User, {
  through: Progress,
  foreignKey: "lessonId",
});

User.belongsToMany(Lesson, {
  through: Progress,
  foreignKey: "userId",
});

Lesson.hasMany(Progress, {
  foreignKey: "lessonId",
  as: "progress",
});

User.hasMany(Progress, {
  foreignKey: "userId",
  as: "progress",
});

Progress.belongsTo(Lesson, {
  foreignKey: "lessonId",
  as: "lesson",
});

Progress.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = Progress;
