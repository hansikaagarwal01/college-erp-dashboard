const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { ROLES } = require("../config/roles");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../validators/courseValidator");

const router = express.Router();

router.use(protect);

// Read: all authenticated roles
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Write: role-restricted
router.post("/", authorize(ROLES.ADMIN), validate(createCourseSchema), createCourse);
router.put(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.FACULTY),
  validate(updateCourseSchema),
  updateCourse
);
router.delete("/:id", authorize(ROLES.ADMIN), deleteCourse);

module.exports = router;
