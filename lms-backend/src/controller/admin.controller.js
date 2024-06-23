const Course = require("../models/course.model");
const Syllabus = require("../models/syllabus.model");
const Lesson = require("../models/lessons.model");
const FacultyInfo = require("../models/facultyInfo.model");
const FacultyAssign = require("../models/facultyAssign.model");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.update(req.body, {
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllModules = async (req, res) => {
  try {
    const modules = await Syllabus.findAll({
      where: { courseId: req.params.courseId },
      include: [
        {
          model: Lesson,
          as: "lessons",
        },
      ],
    });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModule = async (req, res) => {
  try {
    const module = await Syllabus.create({
      courseId: req.body.courseId,
      title: req.body.title,
    });
    res.status(200).json({ message: "Module created successfully", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const module = await Syllabus.update(req.body, {
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Module updated successfully", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const module = await Syllabus.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLeasson = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { syllabusId: req.params.syllabusId },
    });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLeasson = async (req, res) => {
  try {
    const lesson = await Lesson.create({
      syllabusId: req.body.syllabusId,
      title: req.body.title,
      video: req.body.video,
      textContent: req.body.textContent,
    });
    res.status(200).json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeasson = async (req, res) => {
  try {
    const lesson = await Lesson.update(req.body, {
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLeasson = async (req, res) => {
  try {
    const lesson = await Lesson.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};