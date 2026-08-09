const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [studentFacet, facultyFacet, totalDepartments, totalCourses] =
    await Promise.all([
      Student.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            byDepartment: [
              { $group: { _id: "$department", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ],
            bySemester: [
              { $group: { _id: "$semester", count: { $sum: 1 } } },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]),
      Faculty.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            byDesignation: [
              { $group: { _id: "$designation", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ],
          },
        },
      ]),
      Department.countDocuments(),
      Course.countDocuments(),
    ]);

  const student = studentFacet[0] || {};
  const faculty = facultyFacet[0] || {};

  res.status(200).json({
    success: true,
    data: {
      totalStudents: (student.total[0] && student.total[0].count) || 0,
      totalFaculty: (faculty.total[0] && faculty.total[0].count) || 0,
      totalDepartments,
      totalCourses,
      studentsByDepartment: student.byDepartment || [],
      studentsBySemester: student.bySemester || [],
      facultyByDesignation: faculty.byDesignation || [],
    },
  });
});

module.exports = {
  getDashboardStats,
};
