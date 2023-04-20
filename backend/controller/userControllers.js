require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createResponse = (code, message, error, data) => {
  return {
    code: code,
    message: message,
    error: error,
    data: data,
  };
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10m" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    const data = { user, token };

    res
      .status(200)
      .json(createResponse(200, "Logged in successfully", false, data));
  } catch (e) {
    res.status(400).json(createResponse(400, "Can't Login!", e.message, null));
  }
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);

    const data = { user, token };

    res
      .status(200)
      .json(createResponse(200, "User Create Successfully", false, data));
  } catch (e) {
    res
      .status(400)
      .json(createResponse(400, "Couldn't Register User", e.message, null));
  }
};

module.exports = {
  userLogin,
  userSignup,
};
