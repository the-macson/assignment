const express = require('express');
const router = express.Router();
const courseApi = require('./course');

router.use('/course', courseApi);

module.exports = router;