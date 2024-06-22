const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blaklist = require("../lib/blaklist");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    const token = jwt.sign(
      { id: user.id, roles: "1" },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).send({
      message: "User was registered successfully!",
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        token: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign(
      { id: user.id, roles: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).send({
      message: "User was logged in successfully!",
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  const token = req.headers.authorization;
  blaklist.add(token);
  res.status(200).send({ message: "User was logged out successfully!" });
};
