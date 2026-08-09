const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { ROLES } = require("../config/roles");
const {
  getFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");
const {
  createFacultySchema,
  updateFacultySchema,
} = require("../validators/facultyValidator");

const router = express.Router();

router.use(protect);

// Read: all authenticated roles
router.get("/", getFaculty);
router.get("/:id", getFacultyById);

// Write: Admin only
router.post("/", authorize(ROLES.ADMIN), validate(createFacultySchema), createFaculty);
router.put("/:id", authorize(ROLES.ADMIN), validate(updateFacultySchema), updateFaculty);
router.delete("/:id", authorize(ROLES.ADMIN), deleteFaculty);

module.exports = router;
