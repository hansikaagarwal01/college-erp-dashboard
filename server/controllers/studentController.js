const Student = require("../models/Student");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const escapeRegex = require("../utils/escapeRegex");

// Get All Students (search, filter, pagination)
const getStudents = asyncHandler(async (req, res) => {
  const { search = "", department, semester, status } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const query = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { rollNumber: regex },
    ];
  }

  if (department) query.department = department;
  if (semester) query.semester = Number(semester);
  if (status) query.status = status;

  const [total, students] = await Promise.all([
    Student.countDocuments(query),
    Student.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    success: true,
    count: students.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: students,
  });
});

// Get Student By ID
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  res.status(200).json({ success: true, data: student });
});

// Create Student
const createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

// Update Student
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

// Delete Student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
  });
});

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
