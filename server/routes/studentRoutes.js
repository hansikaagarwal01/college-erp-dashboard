const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { ROLES } = require("../config/roles");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const {
  createStudentSchema,
  updateStudentSchema,
} = require("../validators/studentValidator");

const router = express.Router();

router.use(protect);

// Read: all authenticated roles
router.get("/", getStudents);
router.get("/:id", getStudentById);

// Write: role-restricted
router.post("/", authorize(ROLES.ADMIN), validate(createStudentSchema), createStudent);
router.put(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.FACULTY),
  validate(updateStudentSchema),
  updateStudent
);
router.delete("/:id", authorize(ROLES.ADMIN), deleteStudent);

module.exports = router;
