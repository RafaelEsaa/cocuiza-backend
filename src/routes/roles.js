const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
// const { verifyToken } = require("../middlewares/verifyToken");
const { getRolById } = require("../validations");
const messageErrors = require("../middlewares/messagesErrors");

router.post("/register", roleController.registerRole);
router.get("/", roleController.getAllRoles);
router.get(
    "/:id",
    [getRolById, messageErrors],
    roleController.getRoleById,
);

module.exports = router;