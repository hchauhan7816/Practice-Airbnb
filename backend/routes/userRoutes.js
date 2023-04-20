const express = require("express");
const { userLogin, userSignup } = require("../controller/userControllers");

const router = express.Router();

// const User = require("../models/userModel");
// const {
//   viewUser,
//   viewAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require("../controller/userController");

router.post("/login", userLogin);

router.post("/signup", userSignup);
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

module.exports = router;
