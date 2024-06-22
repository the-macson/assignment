const Course = require("../models/course.model");
const CourseAssign = require("../models/courseAssign.model");
const Syllabus = require("../models/syllabus.model");
const Lesson = require("../models/lessons.model");
exports.isCourseEnrolled = async (req, res, next) => {
  const { lessonId } = req.body;
  const { id } = req.authInfo;
  try {
    const courseEnroll = await Lesson.findByPk(lessonId, {
      include: [
        {
          model: Syllabus,
          as: "syllabus",
          required: true,
          attributes: ["courseId"],
          include: [
            {
              model: Course,
              as: "course",
              required: true,
              attributes: ["id"],
              include: [
                {
                  model: CourseAssign,
                  as: "courseAssign",
                  required: true,
                  attributes: ["userId"],
                  where: {
                    userId: id,
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    console.log(courseEnroll);
    if (!courseEnroll) {
      return res.status(404).send({ message: "Course not found!" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
};
