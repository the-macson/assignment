const express = require("express");
const router = express.Router();
const {
  getCourseList,
  getCourseDetails,
  getCourseContent,
  postProgress,
  getProgress,
} = require("../controller/course.controller");
const { isCourseEnrolled } = require("../middlewares/course");
router.get("/", getCourseList);
router.get("/progress", getProgress);
router.get("/:id", getCourseDetails);
router.get("/:courseId/content", getCourseContent);
router.post("/progress", isCourseEnrolled, postProgress);
module.exports = router;
