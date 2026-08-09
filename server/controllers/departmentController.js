const Department = require("../models/Department");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const escapeRegex = require("../utils/escapeRegex");

// Get All Departments (search, filter, pagination)
const getDepartments = asyncHandler(async (req, res) => {
  const { search = "", status } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const query = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [
      { departmentName: regex },
      { departmentCode: regex },
      { hod: regex },
    ];
  }

  if (status) query.status = status;

  const [total, departments] = await Promise.all([
    Department.countDocuments(query),
    Department.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    success: true,
    count: departments.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: departments,
  });
});

// Get Department By ID
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    throw new AppError("Department not found", 404);
  }

  res.status(200).json({ success: true, data: department });
});

// Create Department
const createDepartment = asyncHandler(async (req, res) => {
  const department = await Department.create(req.body);

  res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: department,
  });
});

// Update Department
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!department) {
    throw new AppError("Department not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Department updated successfully",
    data: department,
  });
});

// Delete Department
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) {
    throw new AppError("Department not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Department deleted successfully",
  });
});

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
