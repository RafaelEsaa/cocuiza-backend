const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorizate } = require("../middlewares/authorizate");
const { getUserById } = require("../validations");
const messageErrors = require("../middlewares/messagesErrors");

/* GET users listing. */
router.get("/", 
    // [
    //     verifyToken, 
    //     authorizate(["Admin"])
    // ],
    userController.getAllUsers);

/* GET user by ID */
router.get(
    "/:id",
    [verifyToken, getUserById, messageErrors],
    userController.getUserById,
);

// UPDATE user by ID
router.put(
    "/:id",
    [verifyToken, getUserById, messageErrors],
    userController.updateUser,
);

// DELETE users
router.delete(
    "/:id",
    [verifyToken, authorizate("Admin"), getUserById],
    userController.deleteUser,
);

module.exports = router;
