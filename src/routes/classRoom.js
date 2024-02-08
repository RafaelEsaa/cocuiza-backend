const { Router } = require("express");
const router = Router();

const classRoomController = require("../controllers/classRoomController");

router.get("/", classRoomController.getAllClassroom);
router.post("/", classRoomController.createClassroom);
router.put("/:id", classRoomController.updateClassroom);

module.exports = router;