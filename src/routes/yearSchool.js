const express = require("express");
const router = express.Router();

const yearSchoolController = require("../controllers/yearSchoolController");

router.get("/", yearSchoolController.getAllYearSchools);

module.exports = router;