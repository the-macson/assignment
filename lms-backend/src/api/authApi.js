const express = require("express");
const { checkDuplicateEmailOfUser } = require("../middlewares/verifyRegister");
const { register, login, logout } = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", checkDuplicateEmailOfUser, register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
