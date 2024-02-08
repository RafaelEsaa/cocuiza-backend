const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/role", require("./roles"));
router.use("/yearschool", require("./yearSchool"));
router.use("/schoolsubject", require("./schoolSubject"));
router.use("/classroom", require("./classRoom"));
router.use("/student", require("./student"));

module.exports = router; 