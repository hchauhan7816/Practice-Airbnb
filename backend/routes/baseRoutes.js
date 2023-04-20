const express = require("express");

const baseRouter = express.Router();

// console.log("UOIWEUROIEROIWEUROIWEROIU");

baseRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "HELLO" });
});

// const User = require("../models/userModel");
// const {
//   viewUser,
//   viewAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require("../controller/userController");

// // View user
// router.get("/:id", viewUser);

// // View all users
// router.get("/", viewAllUsers);

// // Create new users
// router.post("/", createUser);

// // Update user
// router.patch("/:id", updateUser);

// // Delete user
// router.delete("/:id", deleteUser);

module.exports = baseRouter;
