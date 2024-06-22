const Course = require("../models/course.model");
const Syllabus = require("../models/syllabus.model");
const Lesson = require("../models/lessons.model");
const FacultyAssign = require("../models/facultyAssign.model");
const FacultyInfo = require("../models/facultyInfo.model");
const { Op, Sequelize } = require("sequelize");
const CourseAssign = require("../models/courseAssign.model");
const Progress = require("../models/progress.model");
const moment = require("moment");

exports.getCourseList = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const categories = req.query.categories ? req.query.categories : null;
  const title = req.query.title ? req.query.title : null;
  try {
    const courses = await Course.findAll({
      where: {
        ...(categories && { categories }),
        ...(title && { title: { [Op.iLike]: `%${title}%` } }),
      },
      limit,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.getCourseDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: Syllabus,
          as: "syllabus",
          attributes: ["id", "title"],
          include: [
            {
              model: Lesson,
              as: "lessons",
              attributes: ["id", "title"],
            },
          ],
        },
        {
          model: FacultyAssign,
          as: "facultyAssign",
          attributes: ["id"],
          include: [
            {
              model: FacultyInfo,
              as: "faculty",
              attributes: ["id", "name", "info"],
            },
          ],
        },
        {
          model: CourseAssign,
          as: "courseAssign",
          attributes: ["id"],
          required: false,
          where: {
            userId: req.authInfo.id,
          },
        },
      ],
    });
    if (!course) return res.status(404).send({ message: "Course not found!" });
    res.status(200).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.getCourseContent = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Syllabus,
          as: "syllabus",
          attributes: ["id", "title"],
          include: [
            {
              model: Lesson,
              as: "lessons",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: [
                {
                  required: false,
                  model: Progress,
                  as: "progress",
                  where: {
                    userId: req.authInfo.id,
                  },
                  attributes: ["id"],
                },
              ],
            },
          ],
        },
        {
          model: CourseAssign,
          as: "courseAssign",
          attributes: ["id"],
          where: {
            userId: req.authInfo.id,
          },
        },
      ],
    });
    res.status(200).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.postProgress = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const progress = await Progress.create({
      lessonId,
      userId: req.authInfo.id,
    });
    res.status(200).send({ message: "Progress added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findAll({
      where: {
        userId: req.authInfo.id,
        createdAt: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "DESC"]],
      raw: true, 
    });
    const formattedProgress = progress.map((p) => ({
      date: moment(p.date, "YYYY-MM-DD").format("Do MMMM YY"),
      lessons: p.count,
    }));
    res.status(200).send(formattedProgress);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
