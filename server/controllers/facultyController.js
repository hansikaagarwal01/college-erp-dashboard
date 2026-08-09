const Faculty = require("../models/Faculty");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const escapeRegex = require("../utils/escapeRegex");

// Get All Faculty (search, filter, pagination)
const getFaculty = asyncHandler(async (req, res) => {
  const { search = "", department, status } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const query = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { employeeId: regex },
    ];
  }

  if (department) query.department = department;
  if (status) query.status = status;

  const [total, faculty] = await Promise.all([
    Faculty.countDocuments(query),
    Faculty.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    success: true,
    count: faculty.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: faculty,
  });
});

// Get Faculty By ID
const getFacultyById = asyncHandler(async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);

  if (!faculty) {
    throw new AppError("Faculty not found", 404);
  }

  res.status(200).json({ success: true, data: faculty });
});

// Create Faculty
const createFaculty = asyncHandler(async (req, res) => {
  const faculty = await Faculty.create(req.body);

  res.status(201).json({
    success: true,
    message: "Faculty created successfully",
    data: faculty,
  });
});

// Update Faculty
const updateFaculty = asyncHandler(async (req, res) => {
  const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!faculty) {
    throw new AppError("Faculty not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Faculty updated successfully",
    data: faculty,
  });
});

// Delete Faculty
const deleteFaculty = asyncHandler(async (req, res) => {
  const faculty = await Faculty.findByIdAndDelete(req.params.id);

  if (!faculty) {
    throw new AppError("Faculty not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
  });
});

module.exports = {
  getFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
