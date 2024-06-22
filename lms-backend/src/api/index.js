const express = require("express");
const router = express.Router();

const authApi = require("./authApi");
const courseApi = require("./courseApi");
const enrollmentApi = require("./enrollmentApi");
const { verifyToken } = require("../middlewares/authJwt");

router.use("/auth", authApi);
router.use("/courses", verifyToken, courseApi);
router.use("/enrollments", verifyToken, enrollmentApi);

module.exports = router;
