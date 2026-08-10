const mongoose = require("mongoose");
const Timetable = require("../models/Timetable");
const Course = require("../models/Course");
const Department = require("../models/Department");
const Faculty = require("../models/Faculty");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");

const COURSE_FIELDS = "courseName courseCode";
const DEPARTMENT_FIELDS = "departmentName departmentCode";
const FACULTY_FIELDS = "firstName lastName employeeId";

const POPULATE = [
  { path: "course", select: COURSE_FIELDS },
  { path: "department", select: DEPARTMENT_FIELDS },
  { path: "faculty", select: FACULTY_FIELDS, populate: { path: "user", select: "name" } },
];

const resolveRef = async (Model, value, fields, label) => {
  if (mongoose.isValidObjectId(value)) return value;
  const doc = await Model.findOne({ $or: fields.map((f) => ({ [f]: value })) }).select("_id");
  if (!doc) throw new AppError(`${label} not found: ${value}`, 400);
  return doc._id;
};

const resolveCourse = (v) => resolveRef(Course, v, ["courseCode", "courseName"], "Course");
const resolveDepartment = (v) =>
  resolveRef(Department, v, ["departmentCode", "departmentName"], "Department");
const resolveFaculty = (v) =>
  resolveRef(Faculty, v, ["employeeId"], "Faculty");

// "09:00" < "10:00" compares correctly with zero-padded strings
const timesOverlap = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

const serializeTimetable = (slot) => ({
  id: slot._id,
  dayOfWeek: slot.dayOfWeek,
  startTime: slot.startTime,
  endTime: slot.endTime,
  course: slot.course
    ? { id: slot.course._id, name: slot.course.courseName, code: slot.course.courseCode }
    : null,
  faculty: slot.faculty
    ? {
        id: slot.faculty._id,
        name: slot.faculty.user?.name || `${slot.faculty.firstName} ${slot.faculty.lastName}`.trim(),
        employeeId: slot.faculty.employeeId,
      }
    : null,
  department: slot.department
    ? { id: slot.department._id, name: slot.department.departmentName, code: slot.department.departmentCode }
    : null,
  semester: slot.semester,
  section: slot.section,
  room: slot.room,
  createdAt: slot.createdAt,
  updatedAt: slot.updatedAt,
});

const findFullSlot = (id) => Timetable.findById(id).populate(POPULATE);

// Check for scheduling conflicts against other slots
const checkConflicts = async (data, excludeId) => {
  const conflicts = [];
  const baseQuery = {
    dayOfWeek: data.dayOfWeek,
    startTime: { $lt: data.endTime },
    endTime: { $gt: data.startTime },
  };

  if (excludeId) baseQuery._id = { $ne: excludeId };

  if (data.room) {
    const roomClash = await Timetable.findOne({ ...baseQuery, room: data.room }).populate({
      path: "course",
      select: COURSE_FIELDS,
    });
    if (roomClash) {
      conflicts.push(`Room "${data.room}" is already booked ${data.dayOfWeek} ${roomClash.startTime}-${roomClash.endTime}`);
    }
  }

  if (data.faculty) {
    const facultyClash = await Timetable.findOne({ ...baseQuery, faculty: data.faculty }).populate({
      path: "faculty",
      select: FACULTY_FIELDS,
      populate: { path: "user", select: "name" },
    });
    if (facultyClash) {
      const name =
        facultyClash.faculty?.user?.name ||
        `${facultyClash.faculty?.firstName || ""} ${facultyClash.faculty?.lastName || ""}`.trim();
      conflicts.push(`Faculty "${name}" is already scheduled ${data.dayOfWeek} ${facultyClash.startTime}-${facultyClash.endTime}`);
    }
  }

  if (data.semester && data.section) {
    const sectionClash = await Timetable.findOne({
      ...baseQuery,
      semester: data.semester,
      section: data.section,
      department: data.department,
    }).populate({ path: "course", select: COURSE_FIELDS });
    if (sectionClash) {
      conflicts.push(
        `Section ${data.semester}-${data.section} already has ${sectionClash.course?.courseName || "a class"} ${sectionClash.startTime}-${sectionClash.endTime}`
      );
    }
  }

  return conflicts;
};

// Get all timetable slots (filter, pagination)
const getTimetable = asyncHandler(async (req, res) => {
  const { dayOfWeek, course, department, faculty, semester, section } = req.query;
  const { page, limit, skip } = getPagination(req.query, 50);

  const query = {};

  if (dayOfWeek) query.dayOfWeek = dayOfWeek;
  if (semester) query.semester = Number(semester);
  if (section) query.section = section.toUpperCase();
  if (course) query.course = await resolveCourse(course);
  if (department) query.department = await resolveDepartment(department);
  if (faculty) query.faculty = await resolveFaculty(faculty);

  const [total, slots] = await Promise.all([
    Timetable.countDocuments(query),
    Timetable.find(query)
      .populate(POPULATE)
      .skip(skip)
      .limit(limit)
      .sort({ dayOfWeek: 1, startTime: 1 }),
  ]);

  res.status(200).json({
    success: true,
    count: slots.length,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    data: slots.map(serializeTimetable),
  });
});

// Get a single slot
const getTimetableById = asyncHandler(async (req, res) => {
  const slot = await findFullSlot(req.params.id);

  if (!slot) {
    throw new AppError("Timetable entry not found", 404);
  }

  res.status(200).json({ success: true, data: serializeTimetable(slot) });
});

// Create a timetable slot (with conflict detection)
const createTimetable = asyncHandler(async (req, res) => {
  const data = {
    ...req.body,
    course: await resolveCourse(req.body.course),
    department: await resolveDepartment(req.body.department),
  };
  if (data.faculty) data.faculty = await resolveFaculty(data.faculty);

  const conflicts = await checkConflicts(data);
  if (conflicts.length) {
    throw new AppError(`Scheduling conflict detected: ${conflicts.join(" | ")}`, 409);
  }

  const slot = await Timetable.create(data);
  const full = await findFullSlot(slot._id);

  res.status(201).json({
    success: true,
    message: "Timetable entry created successfully",
    data: serializeTimetable(full),
  });
});

// Update a timetable slot
const updateTimetable = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (data.course) data.course = await resolveCourse(data.course);
  if (data.department) data.department = await resolveDepartment(data.department);
  if (data.faculty) data.faculty = await resolveFaculty(data.faculty);

  const existing = await Timetable.findById(req.params.id);
  if (!existing) {
    throw new AppError("Timetable entry not found", 404);
  }

  const merged = { ...existing.toObject(), ...data };
  const conflicts = await checkConflicts(merged, req.params.id);
  if (conflicts.length) {
    throw new AppError(`Scheduling conflict detected: ${conflicts.join(" | ")}`, 409);
  }

  const slot = await Timetable.findByIdAndUpdate(req.params.id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  const full = await findFullSlot(slot._id);

  res.status(200).json({
    success: true,
    message: "Timetable entry updated successfully",
    data: serializeTimetable(full),
  });
});

// Delete a timetable slot
const deleteTimetable = asyncHandler(async (req, res) => {
  const slot = await Timetable.findByIdAndDelete(req.params.id);

  if (!slot) {
    throw new AppError("Timetable entry not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Timetable entry deleted successfully",
  });
});

module.exports = {
  getTimetable,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};
