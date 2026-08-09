const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { ROLES } = require("../config/roles");
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const {
  createDepartmentSchema,
  updateDepartmentSchema,
} = require("../validators/departmentValidator");

const router = express.Router();

router.use(protect);

// Read: all authenticated roles
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);

// Write: Admin only
router.post(
  "/",
  authorize(ROLES.ADMIN),
  validate(createDepartmentSchema),
  createDepartment
);
router.put(
  "/:id",
  authorize(ROLES.ADMIN),
  validate(updateDepartmentSchema),
  updateDepartment
);
router.delete("/:id", authorize(ROLES.ADMIN), deleteDepartment);

module.exports = router;
