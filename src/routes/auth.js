const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {registerUser, loginUser} = require("../validations");

// register users
router.post("/signup", registerUser, authController.signUp);

//login user
router.post("/signin", loginUser, authController.signIn);

module.exports = router;
