const User = require("../models/userModel");

const createResponse = (code, message, error, data) => {
  return {
    code: code,
    message: message,
    error: error,
    data: data,
  };
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("EMAIL / PASS -> ", email, password);
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res
      .status(200)
      .json(createResponse(200, "User Create Successfully", false, user));
  } catch (e) {
    res
      .status(400)
      .json(createResponse(400, "Couldn't Register User", e.message, null));
  }
};

module.exports = {
  userLogin,
};
