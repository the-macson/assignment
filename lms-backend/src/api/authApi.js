const express = require("express");
const { checkDuplicateEmailOfUser } = require("../middlewares/verifyRegister");
const { register, login, logout } = require("../controller/auth.controller");
const { verifyRecaptchas } = require("../middlewares/verifyRecaptchas");
const router = express.Router();

router.post("/register", verifyRecaptchas, checkDuplicateEmailOfUser, register);
router.post("/login", verifyRecaptchas, login);
router.post("/logout", logout);

module.exports = router;
