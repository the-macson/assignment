const User = require("../models/user.model");
const checkDuplicateEmailOfUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send({ message: "Email is already in use!" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  checkDuplicateEmailOfUser,
};
