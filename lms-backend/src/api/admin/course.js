const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
  getAllLeasson,
  createLeasson,
  updateLeasson,
  deleteLeasson,
} = require("../../controller/admin.controller");

router.get("/", getAllCourses);
router.post("/", createCourse);
router.put("/", updateCourse);
router.delete("/", deleteCourse);

router.get("/module/:courseId", getAllModules);
router.post("/module", createModule);
router.put("/module", updateModule);
router.delete("/module", deleteModule);

router.get("/lesson/:moduleId", getAllLeasson);
router.post("/lesson", createLeasson);
router.put("/lesson", updateLeasson);
router.delete("/lesson", deleteLeasson);

module.exports = router;
