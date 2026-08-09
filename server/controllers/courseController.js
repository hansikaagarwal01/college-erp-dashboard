const Course = require("../models/Course");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const escapeRegex = require("../utils/escapeRegex");

// Get All Courses (search, filter, pagination)
const getCourses = asyncHandler(async (req, res) => {
  const { search = "", department, semester, status } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const query = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [
      { courseName: regex },
      { courseCode: regex },
    ];
  }

  if (department) query.department = department;
  if (semester) query.semester = Number(semester);
  if (status) query.status = status;

  const [total, courses] = await Promise.all([
    Course.countDocuments(query),
    Course.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    success: true,
    count: courses.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: courses,
  });
});

// Get Course By ID
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({ success: true, data: course });
});

// Create Course
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

// Update Course
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
});

// Delete Course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
