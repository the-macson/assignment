const express = require('express');
const router = express.Router();
const { getCourse, enrollCourse } = require('../controller/enrollment.controller');
router.get('/', getCourse);
router.post('/', enrollCourse);
module.exports = router;