const Course = require("../models/course.model");
const CourseAssign = require("../models/courseAssign.model");

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findAll({
      include: [
        {
          model: CourseAssign,
          as: "courseAssign",
          attributes: [],
          where: {
            userId: req.authInfo.id,
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  if(!courseId) return res.status(400).send({ message: "Please provide all required fields" });
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).send({ message: "Course not found!" });
    }
    const courseAssign = await CourseAssign.create({
      courseId,
      userId: req.authInfo.id,
    });
    res.status(200).send({ message: "Course enrolled successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
