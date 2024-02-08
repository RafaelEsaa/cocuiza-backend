const { Router } = require("express");
const router = Router();

const schoolSubjectController = require("../controllers/schoolSubjectController");

//TODO: validar todos los endpoint
router.get("/", schoolSubjectController.getAllSchoolSubject);
router.post("/", schoolSubjectController.createSchooSubject);
router.put("/:id", schoolSubjectController.updateSchoolSubject);
router.delete("/:id", schoolSubjectController.deleteSchoolSubject);

module.exports = router;
