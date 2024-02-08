const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const messages = require("../middlewares/messagesErrors");
const { registerUser, loginUser } = require("../validations");

router.post("/signup", registerUser, messages, authController.signUp);
router.post("/signin", loginUser, messages, authController.signIn);

module.exports = router;