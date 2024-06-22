const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const FacultyAssign = require("./facultyAssign.model");

const FacultyInfo = sequelize.define(
  "FacultyInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FacultyInfo;