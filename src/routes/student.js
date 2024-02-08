const { Router } = require("express");
const router = Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.get("/classroom/:classroomId", studentController.getStudentsByClassroom);

module.exports = router;