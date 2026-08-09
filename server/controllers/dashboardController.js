const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalStudents, totalFaculty, totalDepartments, totalCourses] =
    await Promise.all([
      Student.countDocuments(),
      Faculty.countDocuments(),
      Department.countDocuments(),
      Course.countDocuments(),
    ]);

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      totalFaculty,
      totalDepartments,
      totalCourses,
    },
  });
});

module.exports = {
  getDashboardStats,
};
