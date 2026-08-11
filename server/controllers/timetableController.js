const Timetable = require("../models/Timetable");

// Get All Timetable Entries
const getTimetable = async (req, res) => {
  try {
    const { department, semester, section, day } = req.query;

    const query = {};

    if (department) query.department = department;
    if (semester) query.semester = Number(semester);
    if (section) query.section = section;
    if (day) query.day = day;

    const entries = await Timetable.find(query).sort({ day: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Timetable Entry By ID
const getTimetableById = async (req, res) => {
  try {
    const entry = await Timetable.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Timetable Entry
const createTimetable = async (req, res) => {
  try {
    const entry = await Timetable.create(req.body);

    res.status(201).json({
      success: true,
      message: "Timetable entry created successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Timetable Entry
const updateTimetable = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timetable entry updated successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Timetable Entry
const deleteTimetable = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timetable entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTimetable,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};